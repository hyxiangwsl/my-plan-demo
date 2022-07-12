import React, { useEffect } from "react";
import { useDispatch, useSelector } from '../../redux/hooks';
import styles from "./index.module.css";
import { getExChange } from "../../redux/planReducer";
const Header: React.FC = () => {
  const dispatch = useDispatch();
  const rateCNYByUSD = useSelector(s => s.plan.rateCNYByUSD);
  const rateRUBByUSD = useSelector(s => s.plan.rateRUBByUSD);
  const rateRUBByCNY = useSelector(s => s.plan.rateRUBByCNY);

  useEffect(() => {
    dispatch(getExChange('USD'));
  }, []);

  return (
    <div>
      <div className={styles.formCon}>
        <form>
          <input type="text" placeholder="请输入任务" />
          <input type="number" placeholder="价格" />
          <select name="" id="" placeholder="货币类型">
            <option value="RUB">卢布</option>
            <option value="CNY">人民币</option>
            <option value="USD">美元</option>
          </select>
        </form>
        <button>添加</button>
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
