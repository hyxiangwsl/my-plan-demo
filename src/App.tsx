import Item from "./components/item/Item";
import Header from "./components/header/Header";
import styles from "./App.module.css";
import { useSelector } from "./redux/hooks";
import stylesItem from "./components/item/index.module.css";
import { getThreeDecimal } from "./util/util";

function App() {
  const planList = useSelector((s) => s.plan.planList);
  // 根据时间戳排序
  const planCompletedList = planList
    .filter((e) => e.completed)
    .sort((a, b) => b.timestamp - a.timestamp);

  const planTodoList = planList
    .filter((e) => !e.completed)
    .sort((a, b) => b.timestamp - a.timestamp);
  console.log(planCompletedList, "planTodoList", planTodoList);
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
            <div className={stylesItem.currency}>₽{getThreeDecimal(planRUBTotal)}</div>
            <div className={stylesItem.currency}>¥{getThreeDecimal(planCNYTotal)}</div>
            <div className={stylesItem.currency}>${getThreeDecimal(planUSDTotal)}</div>
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
            <div className={stylesItem.currency}>₽{getThreeDecimal(totalRUB)}</div>
            <div className={stylesItem.currency}>¥{getThreeDecimal(totalCNY)}</div>
            <div className={stylesItem.currency}>${getThreeDecimal(totalUSD)}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
