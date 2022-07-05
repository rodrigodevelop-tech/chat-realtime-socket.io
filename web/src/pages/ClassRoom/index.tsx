import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export function ClassRoom() {
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  function handleSubmitClassRoom(event: FormEvent) {
    event.preventDefault();

    navigate(`chat/${room}/${name}`);
  }

  return (
    <div className="container">
      <div className="content">
        <form onSubmit={handleSubmitClassRoom}>
          <div className="row">
            <select
              name="select_room"
              id="select_room"
              onChange={(e) => setRoom(e.target.value)}
            >
              <option value="-1">Selecione a sala</option>
              <option value="node">Node</option>
              <option value="java">Java</option>
              <option value="reactjs">ReactJS</option>
              <option value="elixir">Elixir</option>
            </select>
          </div>
          <input
            type="text"
            name="username"
            placeholder="Digite seu usuário"
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Acessar</button>
        </form>
      </div>
    </div>
  );
}
