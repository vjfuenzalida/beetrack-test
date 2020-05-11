import React, { useEffect, useState, useRef } from "react";
import debounce from 'lodash/debounce';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./search-input.scss";


// The SearchInput component renders a text form with an icon prepended to it.
// When input changes, a debounced onChange method is called, with the text changes.
const SearchInput = (props) => {
  const { placeholder, onChange } = props;

  const [search, setSearch] = useState('');

  const throttled = useRef(debounce((newValue) => onChange(newValue), 400));

  const handleTextChange = (event) => {
    event.persist();
    setSearch(event.target.value);
  }
  
  useEffect(() => {
    throttled.current(search);
  }, [search]);

  return (
    <div className="input-group search-input no-border-radius">
      <div className="input-group-prepend">
        <span className="input-group-text bg-white no-border-right" id="search-input">
          <FontAwesomeIcon icon="search" size="lg" color="#fab43d" />
        </span>
      </div>
      <input
        onChange={handleTextChange}
        value={search}
        type="text"
        className="form-control no-border-left"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchInput;
