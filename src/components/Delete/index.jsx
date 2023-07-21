import { useState } from "react";
import API from "../../API/index";

export default function Delete({handleChange}) {
  const [id, setId] = useState(0);

  async function deleteEstablishment() {
    const res = await API.delete("/establishment/delete", {
      headers: {
        id: id,
      },
    });
    handleChange();
    document.querySelector(".iDelete").value = "";
    return alert(res.data);
  }

  return (
    <form id="delete" onSubmit={event => event.preventDefault()}>
      <fieldset>
        <legend>Deletar</legend>
        <p>Preencha o campo ID para deletar um estabelecimento.</p>
        <span>
          <label htmlFor="id">ID:</label>
          <input
            className="iDelete"
            type="number"
            name="id"
            id="id"
            onChange={(e) => setId(e.target.value)}
          />
        </span>
        <button type="button" onClick={(event) => deleteEstablishment(event)}>
          Deletar
        </button>
      </fieldset>
    </form>
  );
}
