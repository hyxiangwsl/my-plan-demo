import Item from "./components/item/Item";
import Header from "./components/header/Header";
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Item />
    </div>
  );
}

export default App;
