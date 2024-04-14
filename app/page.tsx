"use client";

import HRLogin from "./hrpages/login/page";
import HrPage from "./hrpages/page";

interface Props {
  children: JSX.Element;
}
export default function Home({ children }: Props) {
  return (
    <main className={""}>
      <HrPage />
    </main>
  );
}
