import { useState } from "react";
import "./styles.css";

export default function App() {
  const [input, setInput] = useState('')
  const [items, setItems] = useState([]);
  const [index, setIndex] = useState(null)
  function handleSubmit(e) {
    e.preventDefault();
    if (index !== null) {
      const UpdateItems = items.map((item, i) => (i === index ? input : item));
      setItems(UpdateItems)
      setIndex(null)
    }else {
      setItems([...items, input])
    }
    
    setInput("")
  }
  function handleEdit(index, item) {
    if (index !== null) {
      setIndex(index);
      setInput(item);
    }
  }
  function handleDelete(index){
    const updateDelete = items.filter((_,i)=> i !== index);
    setItems(updateDelete)
  }
  return (
    <div className="App">
      <h3>TODO LIST</h3>
      <Input input={input} setinput={setInput} onsubmit={handleSubmit} />
      <List items={items} edit={handleEdit} deleted={handleDelete}/>
    </div>
  );
}
function Input({ input, setinput, onsubmit }) {
  return <form type="submit" onSubmit={onsubmit}>
    <input type="text" value={input} onChange={(e) => setinput(e.target.value)} />
    <button>{input == "" ? "Add" : "Save"}</button>
  </form>
}
function List({ items, edit ,deleted}) {
  return <>
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item} <button onClick={() => edit(index, item)}>Edit</button><button onClick={()=>deleted(index)}>Delete</button></li>
      ))}
    </ul>
  </>
}