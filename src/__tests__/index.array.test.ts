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

test('respondParamsFilter --- []', () => {
  const result = respondParamsFilter([]);
  expect(result).toEqual([]);
});

test('respondParamsFilter --- 自我重复引用爆栈问题', () => {
  let a: any[] = [{ a: null, c: 2, b: null, d: [{ e: undefined }] }];
  a[0].a = a;
  const result: any = respondParamsFilter(a);
  expect(result[0].a).not.toBeNull();
  expect(result[0].b).toBe('');
  expect(result[0].d[0].e).toBe('');
  expect(result[0].a).toEqual(result);
});

test('respondParamsFilter --- 自我重复引用爆栈问题2', () => {
  let a: any[] = [{ a: null, c: 2, b: null, d: [{ e: undefined }] }];
  a[0].a = a;
  a[0].b = a;
  const result: any = respondParamsFilter(a);
  expect(result[0].a).not.toBeNull();
  expect(result[0].d[0].e).toBe('');
  expect(result[0].b).toBe(result);
  expect(result[0].a).toEqual(result);
});

test('respondParamsFilter --- [null, 2, 3, undefined]', () => {
  const result2 = respondParamsFilter([null, 2, 3, undefined]);
  expect(result2).toEqual(['', 2, 3, '']);
});

test('respondParamsFilter --- [{ a: 1, b: 2, c: [] }, { d: null, e: undefined, f: [null] }]', () => {
  const result2 = respondParamsFilter([{ a: 1, b: 2, c: [] }, { d: null, e: undefined, f: [null] }]);
  expect(result2).toEqual([{ a: 1, b: 2, c: [] }, { d: '', e: '', f: [''] }]);
});

test('respondParamsFilter --- [{ a: 1, b: [{ c: 2, d: [null, undefined], g: [{ r: 2, l: {m: 2} }] }] }]', () => {
  const result2 = respondParamsFilter([{ a: 1, b: [{ c: 2, d: [null, undefined], g: [{ r: 2, l: { m: 2 } }] }] }]);
  expect(result2).toEqual([{ a: 1, b: [{ c: 2, d: ['', ''], g: [{ r: 2, l: { m: 2 } }] }] }]);
});

test('respondParamsFilter --- [{ a: 1, b: [{ c: 2, d: [null, undefined], g: [{ r: 2, l: {m: 2} }] }] }, { a: 1, b: [{ c: 2, d: [null, undefined], g: [{ r: 2, l: {m: 2} }] }] }]', () => {
  const result2 = respondParamsFilter([{ a: 1, b: [{ c: 2, d: [null, undefined], g: [{ r: 2, l: { m: 2 } }] }] }, { a: 1, b: [{ c: 2, d: [null, undefined], g: [{ r: 2, l: { m: 2 } }] }] }]);
  expect(result2).toEqual([{ a: 1, b: [{ c: 2, d: ['', ''], g: [{ r: 2, l: { m: 2 } }] }] }, { a: 1, b: [{ c: 2, d: ['', ''], g: [{ r: 2, l: { m: 2 } }] }] }]);
});