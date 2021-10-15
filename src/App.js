import "./styles.css";
import "./app.css";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

export default function App() {
  const [tags, settags] = useState([]);
  const [filterdata, setfilterdata] = useState([]);
  const [inputValue, setInputValue] = useState();
  const datas = [
    { name: "reac js" },
    { name: "node js" },
    { name: "html" },
    { name: "css" },
    { name: "javascript" }
  ];

  const addTags = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      if (event.target.value !== "" && event.target.value !== " ") {
        settags([...tags, event.target.value]);
        const entervalue = (event.target.value = "");
        setInputValue(entervalue);
      }
    }
  };

  const removeTags = (remove) => {
    settags(tags.filter((tag) => tag !== remove));
  };

  const handlechange = (event) => {
    const seacrhword = event.target.value;
    setInputValue(seacrhword);
    const newdatas = datas.filter((value) => {
      return value.name.toLowerCase().includes(seacrhword.toLowerCase());
    });
    if (seacrhword === "") {
      setfilterdata([]);
    } else {
      setfilterdata(newdatas);
    }
  };

  const listItem = (para) => {
    settags([...tags, para]);
    setfilterdata([]);
    setInputValue([]);
  };

  const tagsFromButton = () => {
    if (inputValue) {
      settags([...tags, inputValue]);
      setInputValue([]);
    }
  };

  return (
    <div className="App">
      <p className="first_heading">TAGS</p>
      <p className="second_heading">Select time for your evevnt</p>
      <div className="box">
        <div className="tag_box">
          <ul>
            {tags.map((tag, index) => (
              <li key={index}>
                {tag}
                <span onClick={() => removeTags(tag)} className="close">
                  <CloseIcon />
                </span>
              </li>
            ))}
            <input
              type="text"
              placeholder="enter tags"
              value={inputValue}
              onKeyUp={addTags}
              onChange={handlechange}
            />
          </ul>
        </div>
        {filterdata.length ? (
          <div className="list">
            {filterdata.map((value, key) => {
              return (
                <div className="size">
                  <p className="list_item" onClick={() => listItem(value.name)}>
                    {value.name}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <button onClick={tagsFromButton}>
            <CloseIcon className="plus" />
          </button>
        )}
      </div>
    </div>
  );
}
