import { useState } from "react";

import useDebounce from "../../hooks/useDebounce";

import SelectedItem from "./SelectedItem";
import iconSearch from "../../assets/search.svg";

import styles from "./Index.module.scss";

function AutoCompleteSearch(props) {
  const {
    setValue = () => {},
    onKeywordChange = () => {},
    className = "",
    placeholder = "",
    options = [],
    keyValue = "id",
    keyLabel = "label",
  } = props;

  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState([]);
  const [show, setShow] = useState(false);

  const checkIncludes = (item) =>
    !!selected.find((c) => c[keyValue] === item[keyValue]);

  const debounce = useDebounce((value) => onKeywordChange(value), 500);

  const onKeywordChangeMth = (e) => {
    setKeyword(e.target.value);
    debounce(e.target.value);
  };

  const selectItem = (item) => {
    if (!checkIncludes(item)) {
      const newArr = [...selected];
      newArr.push(item);
      setSelected(newArr);
      setValue(newArr);
    }
  };

  const onDeleteItem = (item) => {
    if (checkIncludes(item)) {
      const newArr = [...selected].filter(
        (c) => c[keyValue] !== item[keyValue]
      );
      setSelected(newArr);
      setValue(newArr);
    }
  };

  return (
    <div className={`${styles["input-autocomplete"]} ${className}`}>
      <div className={styles["input"]}>
        <img src={iconSearch} alt="" onClick={() => setShow(true)} />
        {!!selected.length &&
          selected.map((c) => (
            <SelectedItem
              key={c[keyValue]}
              data={c}
              keyLabel={keyLabel}
              keyValue={keyValue}
              onDelete={onDeleteItem}
            />
          ))}
        <input
          type="text"
          value={keyword}
          placeholder={placeholder}
          onChange={onKeywordChangeMth}
          onClick={() => setShow(true)}
        />
      </div>
      {!!options.length && show && (
        <ul className={styles["dropdown"]}>
          {options.map((c) => (
            <li
              key={c[keyValue]}
              className={checkIncludes(c) ? styles["active"] : ""}
              onClick={() => selectItem(c)}
            >
              {c[keyLabel]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AutoCompleteSearch;
