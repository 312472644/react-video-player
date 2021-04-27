/**
 * 时间格式转化
 *
 * @param {number} time
 * @return hh:mm:ss 格式
 */
const transFormDate = (time: number) => {
  const hCount = Math.floor(time / 3600);
  const mCount = Math.floor(time % 3600 / 60);
  const sCount = Math.floor(time % 60);
  const hours = hCount.toString().padStart(2, '0');
  const mins = mCount.toString().padStart(2, '0');
  const seconds = sCount.toString().padStart(2, '0');
  if (hCount > 0) {
    return `${hours}:${mins}:${seconds}`;
  }
  return `${mins}:${seconds}`;
}


/**
 * 判断对象是否包含某个属性
 *
 * @template T 泛型
 * @param {T} target 目标元素
 * @param {string} propName 属性名称
 * @return {*} 
 */
const hasPrototypeName = <T extends Object>(target: T, propName: string): boolean => {
  let hasExist = false;
  if (!Object.keys(target).length) {
    return false;
  }
  for (let prop in target) {
    if (propName === prop) {
      hasExist = true;
      break;
    }
  }
  return hasExist;
};

export { transFormDate, hasPrototypeName };