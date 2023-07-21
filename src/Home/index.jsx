import {  useState } from "react";

import Creator from "../components/Creator";
import Delete from "../components/Delete";
import Header from "../components/Header";
import Table from "../components/Table";
import "./style.css";

export default function Home() {
  const [change, setChange] = useState(false);

  const handleChange = () => setChange(!change)

  return (
    <>
      <Header />

      <main>
        <Creator handleChange={() => handleChange()} />

        <Delete handleChange={() => handleChange()} />

        <Table change={change}/>
      </main>
      <footer></footer>
    </>
  );
}
