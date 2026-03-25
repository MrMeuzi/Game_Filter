import { useNavigate } from "react-router-dom";
export default function SearchBarGlobal({ onSearchChange, inputValue, setInputValue }) {
const navigate = useNavigate();

  return (
    <form className="input__wrapper" onSubmit={(e) => {
      e.preventDefault();
      onSearchChange(inputValue);
      navigate("/");
    }}>
      <input className="input__input" placeholder="Найти на Game_Filter" type="search" enterKeyHint="search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
/>
      <button type="submit" style={{ display: "none" }} aria-hidden="true" />
      {inputValue !== "" && (<button className="input__button" type="button"
      onClick = {() => {
        setInputValue("");
        onSearchChange("");
        navigate("/");
      }}
      ></button>)}
    </form>
  );
}