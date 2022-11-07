import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import "./Search.css";

function Search(props) {
  const [inputText, setInputText] = useState("");

  let handler = (event) => {
    var lowerCase = event.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  let submit = (event)=>{
    event.preventDefault();
    props.set(inputText);
  };

  return (
    <div className="search">
        <form onSubmit={submit} id="search-form">
            <TextField
                id="search-bar"
                className="text"
                onChange={handler}
                variant="outlined"
                fullWidth
                label="Search"
                size="small"
            />
        </form>
      </div>
  );
}

export default Search;