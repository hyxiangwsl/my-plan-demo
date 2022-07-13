import Item from "./components/item/Item";
import Header from "./components/header/Header";
import styles from "./App.module.css";
import { useSelector } from "./redux/hooks";
import styles2 from "./components/item/index.module.css";
import { useEffect } from "react";
import storeObj from "./redux/store";
import { saveState } from "./util/util";

const sum = (a: number, b: number) => a + b;

function App() {
  const planList = useSelector((s) => s.plan.planList);
  const planCompletedList = planList.filter((e) => e.completed);

  const planTodoList = planList.filter((e) => !e.completed);

  // 计划花费:
  const planRUBTotal = planTodoList.reduce((acc, cur) => sum(acc, cur.priceRUB), 0);
  const planCNYTotal = planTodoList.reduce((acc, cur) => sum(acc, cur.priceCNY), 0);
  const planUSDTotal = planTodoList.reduce((acc, cur) => sum(acc, cur.priceUSD), 0);
  // 总共花费:
  const totalRUB = planCompletedList.reduce((acc, cur) => sum(acc, cur.priceRUB), 0);
  const totalCNY = planCompletedList.reduce((acc, cur) => sum(acc, cur.priceCNY), 0);
  const totalUSD = planCompletedList.reduce((acc, cur) => sum(acc, cur.priceUSD), 0);

  useEffect(() => {
    return () => {
      // 销毁页面的时候
      window.onbeforeunload = () => {
        const state = storeObj.store.getState();
        saveState(state);
      };
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <Header />
      {planTodoList.length > 0 && (
        <div className={styles.planCon}>
          <div>计划:</div>
          {planTodoList.map((item) => (
            <Item {...item} key={item.id} />
          ))}

          <div className={styles.item}>
            <div className={styles2.itemCell1}>将要花费:</div>
            <div className={styles2.itemCell2}>₽{planRUBTotal}</div>
            <div className={styles2.itemCell2}>¥{planCNYTotal}</div>
            <div className={styles2.itemCell2}>${planUSDTotal}</div>
          </div>
        </div>
      )}
      {planCompletedList.length > 0 && (
        <div className={styles.planCon}>
          <div>已完成:</div>
          {planCompletedList.map((item) => (
            <Item {...item} key={item.id} />
          ))}
          <div className={styles.item}>
            <div className={styles2.itemCell1}>一共花了:</div>
            <div className={styles2.itemCell2}>₽{totalRUB}</div>
            <div className={styles2.itemCell2}>¥{totalCNY}</div>
            <div className={styles2.itemCell2}>${totalUSD}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
