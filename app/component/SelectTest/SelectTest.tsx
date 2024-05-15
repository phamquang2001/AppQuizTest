/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Checkbox, Radio, Select } from "antd";
import "./style.scss";
import { DownOutlined } from "@ant-design/icons";
const { Option } = Select;

interface CustomOption {
  value: string;
  label: React.ReactNode;
  desc?: string;
  status?: boolean;
}

interface Props {
  setGameId: (value: number[]) => void;
  setOption: (value: string[]) => void;
}
const SelectTest = (props: Props) => {
  const { setGameId, setOption } = props;
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [check, setCheck] = useState(false);
  const [language, setLanguage] = useState("");
  const [radioChecked, setRadioChecked] = useState(true);
  const handleChange = (value: any) => {
    if (selectedValues.includes(value.value)) {
      const updatedValues = selectedValues.filter(
        (item) => item !== value.value
      );
      setSelectedValues(updatedValues);
    } else if (check && value.value == "Personalitytest") {
      setSelectedValues([...selectedValues]);
    } else {
      setSelectedValues([...selectedValues, value.value]);
    }
    if (value.value === "Personalitytest") {
      setCheck(!check);
    }
  };
  const options: CustomOption[] = [
    {
      label: "Verbal test",
      value: "Verbaltest",
      status: false,
    },
    {
      label: "Numerical test",
      value: "Numericaltest",
      status: false,
    },
    {
      label: "Logical test",
      value: "Logicaltest",
      status: false,
    },
    {
      label: "Visual test",
      value: "Visualtest",
      status: false,
    },
    {
      label: "Memory test",
      value: "Memorytest",
      status: false,
    },
    {
      label: "Personality test",
      value: "Personalitytest",
      status: false,
    },
  ];

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleSaveButtonClick = () => {
    if (check && language === "") {
      setRadioChecked(false);
    } else {
      setDropdownVisible(false);
    }
  };
  useEffect(() => {
    const indexes = selectedValues.map((selectedValue) => {
      return options.findIndex((option) => option.value === selectedValue) + 1;
    });
    indexes.sort((a, b) => a - b);
    if (language) {
      setGameId([...indexes.filter((index) => index !== 0), 6]);
    } else {
      setGameId(indexes);
    }
  }, [selectedValues]);
  useEffect(() => {
    if (check && language === "English") {
      setOption(["en"]);
      const updatedValues = selectedValues.map((item) =>
        item === "Personalitytest" || item === "Personality test in Vietnamese"
          ? "Personality test in English"
          : item
      );
      setSelectedValues(updatedValues);
    } else if (check && language === "Vietnamese") {
      setOption(["vi"]);
      const updatedValues = selectedValues.map((item) =>
        item === "Personalitytest" || item === "Personality test in English"
          ? "Personality test in Vietnamese"
          : item
      );
      setSelectedValues(updatedValues);
    }
    if (!check) {
      setLanguage("");
      setOption([""]);
      console.log("check");
      setSelectedValues(
        selectedValues.filter(
          (value) =>
            value !== "Personality test in Vietnamese" &&
            value !== "Personality test in English"
        )
      );
    }
  }, [language, check]);
  return (
    <div style={{ position: "relative" }}>
      <div
        className="select-test min-h-8 "
        style={{ cursor: "pointer" }}
        onClick={handleDropdownToggle}
      >
        <div className="w-11/12">{selectedValues.join(", ")}</div>
        <DownOutlined className="absolute right-3 flex items-center top-2 opacity-40 text-xs" />
      </div>
      {dropdownVisible && (
        <div
          className="option-select-test"
          style={{
            position: "absolute",
            zIndex: 999,
            top: "100%",
            width: "100%",
            left: 0,
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          <div style={{ fontWeight: 400, margin: "8px" }}>
            Choose tests for your assessmentes
          </div>
          {options.map((option, index) => (
            <div key={index}>
              <Checkbox
                style={{ padding: "8px", width: "100%" }}
                className="w-full check-box-select"
                value={option.value}
                onChange={() => handleChange(option)}
                checked={
                  selectedValues.includes(option.value) ||
                  ((selectedValues.includes("Personality test in English") ||
                    selectedValues.includes(
                      "Personality test in Vietnamese"
                    )) &&
                    index === options.length - 1)
                }
              >
                {option.label}
              </Checkbox>
            </div>
          ))}
          {check && (
            <>
              <Radio.Group
                value={language}
                className="flex flex-col ml-8 gap-3"
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  if (
                    selectedValue === "English" ||
                    selectedValue === "Vietnamese"
                  ) {
                    setLanguage(selectedValue);
                    setRadioChecked(true); // Đặt biến state để chỉ ra rằng radio đã được chọn
                  } else {
                    setLanguage("");
                    setRadioChecked(false); // Đặt biến state để chỉ ra rằng radio chưa được chọn
                  }
                }}
                name="personalityTest"
              >
                <Radio value={"English"}>Personality test in English</Radio>
                <Radio value={"Vietnamese"}>
                  Personality test in Vietnamese
                </Radio>
              </Radio.Group>
              {check && !radioChecked && (
                <span className="text-red-500 flex flex-col ml-8  w-2/3 ">
                  Please select a language.
                </span>
              )}
              <span className="flex flex-col ml-8  w-2/3 opacity-70">
                PyTalent offers two languague versions of personality test. You
                can choose which one is most suitable for your candidates.
              </span>
            </>
          )}
          <button
            className="py-3 px-8 bg-sky-500 text-white border rounded-lg"
            onClick={handleSaveButtonClick}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default SelectTest;
