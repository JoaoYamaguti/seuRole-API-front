/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import API from "../../API/index";

import { questions } from "../../data/questions.jsx";
import { daysOfWeek } from "../../data/days.jsx";

import "./style.css";

export default function Creator({ handleChange }) {
  let asks = questions;
  let listHours = daysOfWeek;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rate, setRate] = useState("");
  const [address, setAddress] = useState("");
  const [hours, setHours] = useState([]);
  const [timeHours, setTimeHours] = useState({
    index: 0,
    weekDay: "",
    open: "",
    close: "",
  });
  const [images, setImages] = useState([]);
  const [txtImages, setTxtImages] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoriesValue, setCategoriesValue] = useState({
    id: 0,
    category: "",
    option: ""
  });

  const handleImages = () => {
    const includeHttp = txtImages.includes("http");

    if (!includeHttp) {
      alert("Não é um link válido");
      return;
    }

    setImages((prevState) => [...prevState, { path: txtImages }]);
    document.querySelector(".iImages").value = "";
    return;
  };
  const clearImages = () => {
    setImages([]);
    document.querySelector(".pImages").value = "";
    return;
  };

  const clearInput = () => {
    setName("");
    setDescription("");
    setRate("");
    setAddress("");
    setHours("");
    setImages([]);
    setCategories([]);
    document.querySelectorAll("input").forEach((i) => (i.value = ""));
    document.querySelectorAll("textarea").forEach((i) => (i.value = ""));
    document
      .querySelectorAll("input[type=radio]")
      .forEach((i) => (i.checked = false));
    document.querySelectorAll("select").forEach((i)=>{i.value=""})
    return;
  };

  const isBlank = () => {
    let isBlank = false;
    const listInputText = [name, description, rate, address, hours];
    const listInputRadio = [images, categories];

    listInputText.forEach((i) => {
      i == "" ? (isBlank = true) : null;
    });

    if (rate < 0 || rate > 5) {
      alert("Rate deve estar entre 0 e 5");
      isBlank = true;
    }

    let empty = false
    categories.map(i=>{
      if (i.options == '' || i.options == undefined)  {
        empty = true
      }
    })
    if (empty) {
      alert("Preencha as categorias!");
      isBlank = true;  
    }
    

    listInputRadio.forEach((i) => {
      i.length == 0 ? (isBlank = true) : null;
    });

    return isBlank;
  };

  async function createEstablishment() {
    let res = "";
    const blank = await isBlank();
    if (!blank) {
      const establishment = {
        name: name,
        description: description,
        rate: rate,
        address: address,
        hours: hours,
        images: images,
        categories: categories,
      };

      await API.post("establishment/create", establishment);
      clearInput();
      handleChange();
      res = "Estabelecimento Criado!";
    } else {
      res = "preenche as coisas direito ai pô...";
    }
    return alert(res);
  }

  function updateSelect(id, index) {
    var select = document.getElementById(id);
    var option = select.options[select.selectedIndex];
    setCategoriesValue({ id: index, option: option.value })

  }

  useEffect(() => {
    timeHours.open !== ""
      ? (listHours[timeHours.index].open = timeHours.open)
      : (listHours[timeHours.index].close = timeHours.close);
    const list = [];
    listHours.map((i) =>
      list.push({ weekDay: i.weekDay, open: i.open, close: i.close })
    );
    setHours(list);
  }, [timeHours]);

  useEffect(() => {
    asks[categoriesValue.id].answer = categoriesValue.option;
    const categoryList = [];
    asks.map((i) =>
      categoryList.push({ category: i.category, options: i.answer })
    );
    console.log(categoryList)
    setCategories(categoryList);
  }, [categoriesValue]);

  return (
    <form id="cadastro" onSubmit={(event) => event.preventDefault()}>
      <fieldset>
        <legend>Cadastro</legend>
        <p>Preencha os campos para cadastrar um estabelecimento.</p>
        <span>
          <label htmlFor="name">Nome:</label>
          <input
            className="inputs"
            type="text"
            name="name"
            id="name"
            onChange={(e) => setName(e.target.value.trim())}
          />
        </span>
        <span>
          <label htmlFor="description">Descrição:</label>
          <textarea
            className="inputs"
            type="text"
            name="description"
            id="description"
            onChange={(e) => setDescription(e.target.value.trim())}
          ></textarea>
        </span>
        <span>
          <label htmlFor="rate">Rate:</label>
          <input
            className="inputs"
            type="number"
            name="rate"
            id="rate"
            onChange={(e) => setRate(e.target.value)}
          />
        </span>
        <span>
          <label htmlFor="address">Endereço:</label>
          <input
            className="inputs"
            type="text"
            name="address"
            id="address"
            onChange={(e) => setAddress(e.target.value.trim())}
          />
        </span>
        <span>
          <label htmlFor="hours">Disponibilidade:</label>

          <div className="hoursRes inputs">
            {daysOfWeek.map(({ weekDay }, index) => {
              return (
                <div key={index} className="subtitle">
                  <label htmlFor="hours">{weekDay}:</label>
                  <div className="inputsHours">
                    <input
                      type="time"
                      name="hours"
                      id="hours"
                      onChange={(e) =>
                        setTimeHours({
                          index: index,
                          weekDay: weekDay,
                          open: e.target.value.trim(),
                          close: "",
                        })
                      }
                    />
                    <span>-</span>
                    <input
                      type="time"
                      name="hours"
                      id="hours"
                      onChange={(e) =>
                        setTimeHours({
                          index: index,
                          weekDay: weekDay,
                          open: "",
                          close: e.target.value.trim(),
                        })
                      }
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </span>
        <span>
          <label htmlFor="images">Imagens:</label>
          <div className="dImages inputs">
            <input
              className="iImages"
              type="text"
              name="images"
              id="images"
              onChange={(e) => setTxtImages(e.target.value.trim())}
            />
            <div className="arrays">
              <button type="button" onClick={() => handleImages()}>
                Add
              </button>
              <button type="button" onClick={() => clearImages()}>
                Clear
              </button>
              <ul className="ulImages">
                {images.map((i, index) => {
                  return <li key={index}>{i.path}</li>;
                })}
              </ul>
            </div>
          </div>
        </span>
        <span>
          <label htmlFor="categories">Categorias:</label>

          <div className="listCategories inputs">
            {questions.map(({ key, category, options }, index) => {
              return (
                <div key={index} className="subtitle">
                <label >{category}:</label>
                <select
                  name={category}
                  id={category}
                  onChange={() =>
                    updateSelect(category, key - 1)
                  }
                >
                  <option value="" ></option>
                  {options.map((op, index) => (
                    <option value={op} key={index}>
                      {op}
                    </option>
                  ))}
                </select>
                </div>
              );
            })}
          </div>
        </span>

        <button type="button" onClick={(event) => createEstablishment(event)}>
          Cadastrar
        </button>
        <p></p>
      </fieldset>
    </form>
  );
}
