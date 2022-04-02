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

test('paramsFilter --- {}', () => {
  const result = paramsFilter({});
  expect(result).toEqual({});
});

test('paramsFilter --- 自我重复引用爆栈问题', () => {
  let a: any = { a: null, c: 2, b: null, d: [{ e: undefined }] };
  a.a = a;
  const result: any = paramsFilter(a);
  expect(result.a).not.toBeNull();
  expect(result.b).toBe('');
  expect(result.d[0].e).toBe('');
  expect(result.a).toEqual(result);
});

test('paramsFilter --- 自我重复引用爆栈问题2', () => {
  let a: any = { a: null, c: 2, b: null, d: [{ e: undefined }] };
  a.a = a;
  a.b = a;
  const result: any = paramsFilter(a);
  expect(result.a).not.toBeNull();
  expect(result.d[0].e).toBe('');
  expect(result.b).toBe(result);
  expect(result.a).toEqual(result);
});

test('paramsFilter --- { a: 1, b: null }', () => {
  const result2 = paramsFilter({ a: 1, b: null });
  expect(result2).toEqual({ a: 1, b: '' });
});

test('paramsFilter --- { a: 1, b: null, c: { e: undefined, d: 2 } }', () => {
  const result2 = paramsFilter({ a: 1, b: null, c: { e: undefined, d: 2 } });
  expect(result2).toEqual({ a: 1, b: '', c: { e: '', d: 2 } });
});

test('paramsFilter --- { a: 1, b: [null]}', () => {
  const result2 = paramsFilter({ a: 1, b: [null] });
  expect(result2).toEqual({ a: 1, b: [''] });
});

test('paramsFilter --- { a: 1, b: [null], c: [{ d: 1, e: undefined, f: { s: null, g: 2, k: [null], l: { s: 2, m: undefined } } }]}', () => {
  const result2 = paramsFilter({ a: 1, b: [null], c: [{ d: 1, e: undefined, f: { s: null, g: 2, k: [null], l: { s: 2, m: undefined } } }] });
  expect(result2).toEqual({ a: 1, b: [''], c: [{ d: 1, e: '', f: { s: '', g: 2, k: [''], l: { s: 2, m: '' } } }] });
});
