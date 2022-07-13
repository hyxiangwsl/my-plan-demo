import Item from "./components/item/Item";
import Header from "./components/header/Header";
import styles from "./App.module.css";
import { useSelector } from "./redux/hooks";
import stylesItem from "./components/item/index.module.css";
import { useEffect } from "react";
import storeObj from "./redux/store";
import { saveState } from "./util/util";


function App() {
  const planList = useSelector((s) => s.plan.planList);
  const planCompletedList = planList.filter((e) => e.completed);

  const planTodoList = planList.filter((e) => !e.completed);

  // 计划花费:
  let planRUBTotal = 0;
  let planCNYTotal = 0;
  let planUSDTotal = 0;
  planTodoList.forEach((e) => {
    planRUBTotal += e.priceRUB;
    planCNYTotal += e.priceCNY;
    planUSDTotal += e.priceUSD;
  });

  // 总共花费:
  let totalRUB = 0;
  let totalCNY = 0;
  let totalUSD = 0;
  planCompletedList.forEach((e) => {
    totalRUB += e.priceRUB;
    totalCNY += e.priceCNY;
    totalUSD += e.priceUSD;
  });

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
            <div className={stylesItem.currencyDescription}>将要花费:</div>
            <div className={stylesItem.currency}>₽{planRUBTotal}</div>
            <div className={stylesItem.currency}>¥{planCNYTotal}</div>
            <div className={stylesItem.currency}>${planUSDTotal}</div>
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
            <div className={stylesItem.currencyDescription}>一共花了:</div>
            <div className={stylesItem.currency}>₽{totalRUB}</div>
            <div className={stylesItem.currency}>¥{totalCNY}</div>
            <div className={stylesItem.currency}>${totalUSD}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
