
// 获取三位小数

export const getThreeDecimal = (num: number) => {
  return Math.floor(num * 1000) / 1000;
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // ...错误处理
    console.error('保存错误')
  }
};
