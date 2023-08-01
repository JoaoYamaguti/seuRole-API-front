/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import API from "../../API/index";

import "./style.css";

export default function Table({ change }) {
  const [establishments, setEstablishments] = useState([]);

  const getAllDataFromAPI = async () => {
    const res = await API.get("/establishment/findAll");
    setEstablishments(res.data);
    return console.log("Dados da API Chegaram!");
  };

  useEffect(() => {
    getAllDataFromAPI();
  }, [change]);

  return (
    <section className="table">
      <div className="tableTitle">
        <h2>DataBase</h2>
        <button type="button" onClick={() => getAllDataFromAPI()}>
          Atualizar
        </button>
      </div>
      <div className="abc">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Rate</th>
              <th>Address</th>
              <th>Hours</th>
              <th>Images</th>
              <th>Categories</th>
            </tr>
          </thead>
          <tbody>
            {establishments.map((estab) => (
              <tr key={estab.id}>
                <td>{estab.id}</td>
                <td>{estab.name}</td>
                <td>{estab.description}</td>
                <td>{estab.rate}</td>
                <td>{estab.address}</td>
                <td>
                  {estab.hours.map((i) => `${i.weekDay}:${i.open}-${i.close} `)}
                </td>
                <td>{estab.images.map((i) => `${i.path} `)}</td>
                <td>
                  {estab.categories.map((i) => `${i.category}:${i.options} `)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
