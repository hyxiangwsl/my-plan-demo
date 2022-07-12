import React from "react";
import styles from "./index.module.css";

const Item: React.FC = () => (
  <div className={styles.item}>
    <div className={styles.itemCell1}>
      <input type="checkbox" />
      <span>去吃麻辣烫</span>
    </div>
    <div className={styles.itemCell2}>p1</div>
    <div className={styles.itemCell2}>p2</div>
    <div className={styles.itemCell2}>p3</div>
  </div>
);

export default Item;
