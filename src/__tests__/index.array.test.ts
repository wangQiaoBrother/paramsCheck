import { paramsFilter } from '../index';

test('paramsFilter --- 传入是普通类型并且返回普通类型', () => {
  const result = paramsFilter('test');
  expect(result).toBe('test');
  const result2 = paramsFilter(1);
  expect(result2).toBe(1);
  const result3 = paramsFilter(null);
  expect(result3).toBe('');
  const result4 = paramsFilter(true);
  expect(result4).toBe(true);
});

test('paramsFilter --- []', () => {
  const result = paramsFilter([]);
  expect(result).toEqual([]);
});

test('paramsFilter --- 自我重复引用爆栈问题', () => {
  let a: any[] = [{ a: null, c: 2, b: null, d: [{ e: undefined }] }];
  a[0].a = a;
  const result: any = paramsFilter(a);
  expect(result[0].a).not.toBeNull();
  expect(result[0].b).toBe('');
  expect(result[0].d[0].e).toBe('');
  expect(result[0].a).toEqual(result);
});

test('paramsFilter --- 自我重复引用爆栈问题2', () => {
  let a: any[] = [{ a: null, c: 2, b: null, d: [{ e: undefined }] }];
  a[0].a = a;
  a[0].b = a;
  const result: any = paramsFilter(a);
  expect(result[0].a).not.toBeNull();
  expect(result[0].d[0].e).toBe('');
  expect(result[0].b).toBe(result);
  expect(result[0].a).toEqual(result);
});

test('paramsFilter --- 自我重复引用爆栈问题3', () => {
  let a: any[] = [{ a: null, c: 2, b: null, d: [{ e: undefined }] }, { a: null, c: 2, b: null, d: [{ e: undefined }] }];
  a[0].a = a;
  a[0].b = a;
  a[1].a = a;
  a[1].b = a;
  const result: any = paramsFilter(a);
  expect(result[0].a).not.toBeNull();
  expect(result[0].d[0].e).toBe('');
  expect(result[0].b).toBe(result);
  expect(result[0].a).toEqual(result);
});

test('paramsFilter --- [null, 2, 3, undefined]', () => {
  const result2 = paramsFilter([null, 2, 3, undefined]);
  expect(result2).toEqual(['', 2, 3, '']);
});

test('paramsFilter --- [{ a: 1, b: 2, c: [] }, { d: null, e: undefined, f: [null] }]', () => {
  const result2 = paramsFilter([{ a: 1, b: 2, c: [] }, { d: null, e: undefined, f: [null] }]);
  expect(result2).toEqual([{ a: 1, b: 2, c: [] }, { d: '', e: '', f: [''] }]);
});

test('paramsFilter --- [{ a: 1, b: [{ c: 2, d: [null, undefined], g: [{ r: 2, l: {m: 2} }] }] }]', () => {
  const result2 = paramsFilter([{ a: 1, b: [{ c: 2, d: [null, undefined], g: [{ r: 2, l: { m: 2 } }] }] }]);
  expect(result2).toEqual([{ a: 1, b: [{ c: 2, d: ['', ''], g: [{ r: 2, l: { m: 2 } }] }] }]);
});

test('paramsFilter --- [{ a: 1, b: [{ c: 2, d: [null, undefined], g: [{ r: 2, l: {m: 2} }] }] }, { a: 1, b: [{ c: 2, d: [null, undefined], g: [{ r: 2, l: {m: 2} }] }] }]', () => {
  const result2 = paramsFilter([{ a: 1, b: [{ c: 2, d: [null, undefined], g: [{ r: 2, l: { m: 2 } }] }] }, { a: 1, b: [{ c: 2, d: [null, undefined], g: [{ r: 2, l: { m: 2 } }] }] }]);
  expect(result2).toEqual([{ a: 1, b: [{ c: 2, d: ['', ''], g: [{ r: 2, l: { m: 2 } }] }] }, { a: 1, b: [{ c: 2, d: ['', ''], g: [{ r: 2, l: { m: 2 } }] }] }]);
});