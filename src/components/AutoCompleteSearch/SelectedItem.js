import iconX from "../../assets/X.svg";

import styles from "./Index.module.scss";

function SelectedItem(props) {
  const {
    className = "",
    data = {},
    keyLabel = "label",
    onDelete = () => {},
  } = props;

  const onDeleteItem = () => {
    onDelete(data);
  };

  return (
    <div className={`${styles["item"]} ${className}`}>
      {data[keyLabel]} <img src={iconX} alt="" onClick={onDeleteItem} />
    </div>
  );
}

export default SelectedItem;
