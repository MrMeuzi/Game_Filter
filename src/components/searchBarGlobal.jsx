import {  useEffect, useState } from "react";
export default function SearchBarGlobal({onSearchChange, searchText}) {
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    setInputValue(searchText ?? "");
  }, [searchText]);
  return (
    <div className="input__wrapper">
      <input className="input__input" placeholder="Найти на Game_Filter" onChange={(inputEdit) => {
        setInputValue(inputEdit.target.value);
      }} value={inputValue} onKeyDown={(KeyboardEvent) => KeyboardEvent.key === "Enter" ? onSearchChange(KeyboardEvent.currentTarget.value) : undefined} />
      {inputValue !== "" && (<button className="input__button"
      onClick = {() => {
        onSearchChange("");
        setInputValue("");
      }}
      ></button>)}
    </div>
  );
}