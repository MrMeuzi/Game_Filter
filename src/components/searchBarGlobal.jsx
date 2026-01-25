import {  useEffect, useState } from "react";
export default function SearchBarGlobal({onSearchChange, searchText}) {
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    setInputValue(searchText ?? "");
  }, [searchText]);
  return (
    <form className="input__wrapper" onSubmit={(keyboardEvent) => {
      keyboardEvent.preventDefault();
      onSearchChange(inputValue)
    }}>
      <input className="input__input" placeholder="Найти на Game_Filter" onChange={(inputEdit) => {
        setInputValue(inputEdit.target.value);
      }} value={inputValue} onKeyDown={(KeyboardEvent) => KeyboardEvent.key === "Enter" ? onSearchChange(KeyboardEvent.currentTarget.value) : undefined} />
      {inputValue !== "" && (<button className="input__button" type="button"
      onClick = {() => {
        onSearchChange("");
        setInputValue("");
      }}
      ></button>)}
    </form>
  );
}