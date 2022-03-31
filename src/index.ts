/**
 * 目的：过滤后台返回参数不能为 null, undefined等不合法参数，替换成''空字符串，这样页面上就不会出现null，undefined等
 * 思路：1. 判断是普通类型，
 *      2. 数组或者对象类型
 *      3. 数组或者对象类型的需要递归调用类型判断
*/
import { detectionType, isPlain, isUndef } from './utils';

interface Inode {
  data: unknown,
  key: unknown,
  parent: unknown
}
/**
* 递归校验对象参数 是否为undefined，null
* 例：{a:1,c:null}，{a:[{a:1}]}
*/
export function respondParamsFilter<T>(x: T, map: any = new WeakMap()): unknown {
  try {
    // 判断是否是 undefined null
    if (isUndef(x)) return '';
    // 判断是普通类型 直接返回
    if (isPlain(x)) return x;
    let root: object | [] = {};
    if (detectionType(x) === "object") {
      root = {};
    } else if (detectionType(x) === "array") {
      root = [];
    }
    let loopList: Inode[] = [{
      parent: root,
      key: undefined,
      data: x
    }];
    while (loopList.length) {
      let node = loopList.pop();
      const { data, parent, key }: any = node;
      // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
      let target = parent;
      if (detectionType(key) !== "undefined") {
        target = parent[key] = detectionType(data) === "object" ? {} : [];
      }
      if (map.get(data)) {
        parent[key] = map.get(data);
        continue;
      }
      map.set(data, target);
      if (detectionType(data) === "object") {
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            // 不是object或者array
            if (!isPlain(data[key])) {
              loopList.push({
                parent: target,
                key,
                data: data[key],
              });
            } else {
              target[key] = isUndef(data[key]) ? '' : data[key];
            }
          }
        }
      } else if (detectionType(data) === "array") {
        for (let i = 0; i < data.length; i++) {
          // 不是object或者array
          if (!isPlain(data[i])) {
            loopList.push({
              parent: target,
              key: i,
              data: data[i],
            });
          } else {
            target[i] = isUndef(data[i]) ? '' : data[i];
          }
        }
      }
    }
    return root;
  } catch (error) {
    console.warn('error', error)
    return x;
  }
}
