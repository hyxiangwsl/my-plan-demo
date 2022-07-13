import React from "react";
import styles from "./index.module.css";
import { Plan, planSlice } from "../../redux/planSlice";
import { useDispatch } from "../../redux/hooks";

const Item: React.FC<Plan> = ({ id, task, priceCNY, priceRUB, priceUSD, completed }) => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    console.log(e.target.checked);
    dispatch(planSlice.actions.donePlan({ id, completed: e.target.checked }));
  };

  return (
    <div className={styles.item}>
      <div className={styles.itemCell1}>
        <input
          type="checkbox"
          onClick={(e) => {
            handleChange(e);
          }}
          checked={completed}
        />
        {<span className={`${completed && styles.textCheck}`}>{task}</span>}
      </div>
      <div className={styles.itemCell2}>₽{priceRUB}</div>
      <div className={styles.itemCell2}>¥{priceCNY}</div>
      <div className={styles.itemCell2}>${priceUSD}</div>
    </div>
  );
};

export default Item;
