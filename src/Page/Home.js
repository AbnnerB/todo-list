import { useEffect, useState } from "react";

import "./home.css";

import {
  AiFillDelete,
  AiFillPlusCircle,
  AiOutlineCheckCircle,
} from "react-icons/ai";

export default function Home() {
  const [texts, setTexts] = useState("");
  const [id, setId] = useState(0);

  const [arrayTodo, setArrayTodo] = useState(
    () => JSON.parse(localStorage.getItem("arrayTodo")) || []
  );

  useEffect(() => {
    //soluçao para o problema no id
    //quando a pagina recarregava o id voltava a 0, então se o usuario recarregasse a pagina e adicionasse mais 1 item na lista, esse item viria com o id 0, fazendo com q o id se repetisse

    let storedArray = JSON.parse(localStorage.getItem("arrayTodo")) || [];
    let getId = storedArray.map((task) => {
      return task.id;
    });

    let lastId = getId[getId.length - 1];

    setId(lastId + 1 || 0);
  }, []);

  function addTodo() {
    if (texts.length < 1) {
      alert("Digite alguma coisa ");
      return;
    }

    const todoObj = {
      id: id,
      text: texts,
      checkedButton: true,
      valor: 0,
      quant: 1,
    };
    setId(id + 1);

    setArrayTodo([...arrayTodo, todoObj]);

    setTexts("");
  }

  useEffect(() => {
    localStorage.setItem("arrayTodo", JSON.stringify(arrayTodo));
  }, [arrayTodo]);

  function deleteItem(id) {
    let filtered = arrayTodo.filter((todo) => todo.id !== id);
    setArrayTodo(filtered);

    localStorage.setItem("arrayTodo", JSON.stringify(filtered));
    console.log(arrayTodo);
  }

  return (
    <div className="containerAll">
      <div className="containerHome">
        <h1 className="titleNotes">ANOTAÇÕES</h1>

        <div className="inputButton">
          <input
            type="text"
            maxLength="40"
            placeholder="Digite aqui..."
            value={texts}
            onChange={(e) => setTexts(e.target.value)}
            autoFocus
          />

          <button onClick={addTodo}>
            <AiFillPlusCircle />
          </button>
        </div>
        <div className="containerLista">
          {arrayTodo.map((item, index) => (
            <div key={index} className="lista">
              <span>
                <button>
                  <AiOutlineCheckCircle />
                </button>
                {item.text}
              </span>
              <button
                className="buttonDelete"
                onClick={() => deleteItem(item.id)}
              >
                <AiFillDelete />
              </button>
            </div>
          ))}
        </div>
      </div>

      <footer>
        <p>
          <span className="signature">Ass: Abnner Borges</span>
        </p>
        <div className="linksRefIcon">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://icons8.com/icon/lNIaXGUuT4qe/notes"
          >
            <span> Icone </span>
          </a>
          retirado do site
          <a target="_blank" rel="noreferrer" href="https://icons8.com">
            <span> Icons8 </span>
          </a>
        </div>
      </footer>
    </div>
  );
}
