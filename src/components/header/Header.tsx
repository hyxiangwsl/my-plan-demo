import React, { useEffect, useState } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "../../redux/hooks";
import styles from "./index.module.css";
import { getExChange, planSlice } from "../../redux/planSlice";
import { getThreeDecimal } from "../../util/util";

const currencyList = [
  {
    key: "RUB",
    name: "卢布",
  },
  {
    key: "CNY",
    name: "人民币",
  },
  {
    key: "USD",
    name: "美元",
  },
];

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const rateCNYByUSD = useSelector((s) => s.plan.rateCNYByUSD);
  const rateRUBByUSD = useSelector((s) => s.plan.rateRUBByUSD);
  const rateRUBByCNY = useSelector((s) => s.plan.rateRUBByCNY);

  // 任务名称
  const [task, setTask] = useState<string>("");
  // 任务价格
  const [price, setPrice] = useState<string>("");
  // 货币类型
  const [currency, setCurrency] = useState<string>("");

  useEffect(() => {
    if (!rateCNYByUSD || !rateRUBByUSD || !rateRUBByCNY) {
      dispatch(getExChange("USD"));
    }
  }, []);

  const onAdd = () => {
    if (!task || !price || !currency) {
      alert("请填写完整");
      return;
    }

    // 计算价格
    let priceRUB = 0;
    let priceCNY = 0;
    let priceUSD = 0;
    const priceTemp = parseFloat(price);
    if (currency === "RUB") {
      priceRUB = priceTemp;
      priceCNY = priceRUB / rateRUBByCNY;
      priceUSD = priceRUB / rateRUBByUSD;
    }
    if (currency === "CNY") {
      priceCNY = priceTemp;
      priceRUB = rateRUBByCNY * priceCNY;
      priceUSD = priceCNY / rateCNYByUSD;
    }
    if (currency === "USD") {
      priceUSD = priceTemp;
      priceRUB = priceUSD * rateRUBByUSD;
      priceCNY = priceUSD * rateCNYByUSD;
    }
    // 添加任务
    dispatch(
      planSlice.actions.addPlan({
        id: _.uniqueId(),
        task,
        price,
        completed: false,
        priceRUB: getThreeDecimal(priceRUB),
        priceCNY: getThreeDecimal(priceCNY),
        priceUSD: getThreeDecimal(priceUSD),
        timestamp: new Date().getTime(),
      })
    );
    // 清空输入框
    setTask("");
    setPrice("");
    setCurrency("");
  };

  return (
    <div>
      <div className={styles.formCon}>
        <form>
          <input
            type="text"
            placeholder="请输入任务"
            value={task}
            onChange={(e) => {
              setTask(e.target.value);
            }}
          />
          <input
            type="number"
            step={0.01}
            value={price}
            placeholder="价格"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <select
            placeholder="货币类型"
            value={currency}
            onChange={(e) => {
              const index = e.target.selectedIndex - 1;
              const val = currencyList[index]?.key || "";
              setCurrency(val);
            }}
          >
            <option value="" disabled style={{ display: "none", color: "#666" }}>
              货币类型
            </option>
            {currencyList.map((e) => (
              <option value={e.key} key={e.key}>
                {e.name}
              </option>
            ))}
          </select>
        </form>
        <button onClick={onAdd} style={{ width: 60 }}>
          添加
        </button>
      </div>
      <div className={styles.rateCon}>
        <span>{rateCNYByUSD}¥/$</span>
        <span>{rateRUBByUSD}₽/$</span>
        <span>{rateRUBByCNY}₽/¥</span>
      </div>
    </div>
  );
};

export default Header;
