import { useEffect, useState } from "react";
import "./home.css";

import { AiFillDelete, AiFillPlusCircle } from "react-icons/ai";
import { BsCheckCircle, BsCheckCircleFill } from "react-icons/bs";

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

  function addTodoWithEnter(event) {
    if (event.key === "Enter") {
      addTodo();
    }
  }

  function addTodo() {
    if (texts.length < 1) {
      alert("Preencha o campo de texto...");
      return;
    }

    const todoObj = {
      id: id,
      text: texts,
      checkedButton: false,
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

  function completeTask(id) {
    let mappingTask = arrayTodo.map((todo) => {
      if (todo.id === id) {
        todo.checkedButton = !todo.checkedButton;
      }
      return todo;
    });
    setArrayTodo(mappingTask);
    localStorage.setItem("arrayTodo", JSON.stringify(mappingTask));
  }

  return (
    <div className="containerAll">
      <div className="containerMainContent">
        <h1 className="titleNotes">ANOTAÇÕES</h1>

        <div className="inputButton">
          <input
            type="text"
            maxLength="20"
            placeholder="Digite aqui..."
            value={texts}
            onChange={(e) => setTexts(e.target.value)}
            autoFocus
            onKeyPress={addTodoWithEnter}
          />

          <button onClick={addTodo}>
            <AiFillPlusCircle />
          </button>
        </div>
        <div className="containerList">
          {arrayTodo.map((item, index) => (
            <div key={index} className="lista">
              <span>
                <button
                  className="buttonChecked"
                  onClick={() => completeTask(item.id)}
                >
                  {item.checkedButton ? (
                    <BsCheckCircleFill />
                  ) : (
                    <BsCheckCircle />
                  )}
                </button>
                <span
                  className="textTodoList"
                  style={
                    item.checkedButton
                      ? { textDecoration: "line-through" }
                      : { textDecoration: "none" }
                  }
                >
                  {item.text}
                </span>
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
        <p className="signature">Ass: Abnner Borges</p>
        <div className="linksRefIcon">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://icons8.com/icon/lNIaXGUuT4qe/notes"
          >
            <span> Icone </span>
          </a>
          da pagina retirado do site
          <a target="_blank" rel="noreferrer" href="https://icons8.com">
            <span> Icons8 </span>
          </a>
        </div>
      </footer>
    </div>
  );
}
