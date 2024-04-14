import { Radio, TreeSelect } from "antd";
import React, { useEffect, useState } from "react";

const { SHOW_PARENT } = TreeSelect;

// const treeData = [
//   {
//     title: "Verbal test",
//     value: "Verbaltest",
//     key: "0-0",
//   },
//   {
//     title: "Numerical test",
//     value: "Numericaltest",
//     key: "0-1",
//   },
//   {
//     title: "Logical test",
//     value: "Logicaltest",
//     key: "0-2",
//   },
//   {
//     title: "Visual test",
//     value: "Visualtest",
//     key: "0-3",
//   },
//   {
//     title: "Memory test",
//     value: "Memorytest",
//     key: "0-4",
//   },
//   {
//     title: languague === "English" ? "Personality test in English" : languague === "Vietnamese" ? "Personality test in Vietnamese" : "Personality test",
//     value: "Personalitytest",
//     key: "0-5",
//   },
// ];

const TreeSelect1: React.FC = () => {
  const [valueList, setValueList] = useState<any[]>([]);
  const [language, setLanguage] = useState("");
  const [check, setCheck] = useState(false);
  const onChange = (newValue: string[]) => {
    const arr = newValue;
    console.log(arr);
    if (arr.includes("Personalitytest")) {
      console.log(">>>>>>", 1);
      console.log(language);
      if (language == "English") {
        console.log(">>>>>>", 2);

        const updatedArr = arr.map((item) =>
          item === "Personalitytest" ? "English" : item
        );
        setValueList(updatedArr);
      } else if (language === "Vietnamese") {
        console.log(">>>>>>", 3);

        const updatedArr = arr.map((item) =>
          item == "Personalitytest" ? "Vietnamese" : item
        );
        setValueList(updatedArr);
      } else {
        setValueList(newValue);
      }
    } else {
      setValueList(newValue);
    }
  };
  const treeData = [
    {
      title: "Verbal test",
      value: "Verbaltest",
      key: "0-0",
    },
    {
      title: "Numerical test",
      value: "Numericaltest",
      key: "0-1",
    },
    {
      title: "Logical test",
      value: "Logicaltest",
      key: "0-2",
    },
    {
      title: "Visual test",
      value: "Visualtest",
      key: "0-3",
    },
    {
      title: "Memory test",
      value: "Memorytest",
      key: "0-4",
    },
    {
      title: "Personality test",
      value: "Personalitytest",
      key: "0-5",
    },
  ];
  useEffect(() => {
    try {
      if (valueList?.includes("Personalitytest" as never)) {
        setCheck(true);
      } else {
        setCheck(false);
      }
    } catch (error) {
      console.error("Error in useEffect:", error);
    }
  }, [valueList]);

  const tProps = {
    treeData,
    value: valueList,
    onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "Please select",
    style: {
      width: "100%",
    },
    dropdownRender: (menu: React.ReactNode) => (
      <div>
        <div style={{ fontWeight: 400, padding: "8px" }}>
          Choose tests for your assessmentes
        </div>
        <div style={{ fontWeight: 400, maxHeight: "300px", overflowY: "auto" }}>
          {menu}
        </div>
        <div style={{ fontWeight: 400, padding: "8px" }}>
          {check && (
            <>
              <Radio.Group
                className="flex flex-col ml-8 gap-3"
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  if (
                    selectedValue === "English" ||
                    selectedValue === "Vietnamese"
                  ) {
                    setLanguage(selectedValue);
                  } else {
                    setLanguage("");
                  }
                }}
                name="personalityTest"
              >
                <Radio value={"English"}>Personality test in English</Radio>
                <Radio value={"Vietnamese"}>
                  Personality test in Vietnamese
                </Radio>
              </Radio.Group>
              <span className="flex flex-col ml-8  w-2/3 opacity-70">
                PyTalent offers two languague versions of personality test. You
                can choose which one is most suitable for your candidates.
              </span>
            </>
          )}
        </div>
        <button className="py-3 px-8 bg-sky-500 text-white border rounded-lg ">
          Save
        </button>
      </div>
    ),
  };
  console.log(valueList);
  return <TreeSelect {...tProps} />;
};

export default TreeSelect1;
