/**
 * 校验数据类型
 * return: string boolean number symbol function array object
 */
export const detectionType = <T,>(s: T): string => {
  const value: Array<string> = Object.prototype.toString.call(s).match(/\[([^]*)\]/) || [];
  return value[1].split(' ')[1].toLowerCase();
};
/**
 * 是否是普通类型
 */
export const isPlain = <T,>(x: T): boolean => {
  return detectionType(x) !== 'object' && detectionType(x) !== 'array';
};
/**
 * 校验是否是undefined或者null 报错 'undefined','null'
 */
export const isUndef = (v: unknown | string): boolean => {
  return v === undefined || v === null || v === 'undefined' || v === 'null';
};
