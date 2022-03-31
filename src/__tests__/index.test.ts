import { respondParamsFilter } from '../index';

test('respondParamsFilter --- 传入是普通类型并且返回普通类型', () => {
  const result = respondParamsFilter('test');
  expect(result).toBe('test');
  const result2 = respondParamsFilter(1);
  expect(result2).toBe(1);
  const result3 = respondParamsFilter(null);
  expect(result3).toBe('');
  const result4 = respondParamsFilter(true);
  expect(result4).toBe(true);
});

test('respondParamsFilter --- 自动识别传入的类型并执行对应的函数', () => {
  const result = respondParamsFilter({ a: 1, b: null });
  expect(result).toEqual({ a: 1, b: '' });
  const result2 = respondParamsFilter([null, 2, 3, undefined]);
  expect(result2).toEqual(['', 2, 3, '']);
});
