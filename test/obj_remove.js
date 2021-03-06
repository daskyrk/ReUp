import test from 'ava';
import _ from 'lodash';
import { testObj, clone, remove } from '../src/base_for_test';

const getObj = clone(testObj);
const origin = null;
let result = null;


test('移除根级属性base', (t) => {
  result = remove(getObj(), '', ['base']).val();
  t.is(result.base, undefined);
  t.snapshot(result);
});

test('移除obj.love obj.like两个属性', (t) => {
  result = remove(getObj(), 'obj', ['love', 'like']).val();
  t.is(result.obj.love, undefined);
  t.is(result.obj.like, undefined);
  t.snapshot(result);
});

test('移除obj.obj_arr里的第4项 problem', (t) => {
  result = remove(getObj(), 'obj.obj_arr.3').val();
  t.is(result.obj.obj_arr.length, 3);
  t.falsy(result.obj.obj_arr.includes('problem'));
  t.snapshot(result);
});

// todo 添加toremove ？
// test('移除obj.obj_arr里的 problem', (t) => {
//   result = remove(getObj(), 'obj.obj_arr', 'problem').val();
//   t.is(result.obj.obj_arr.length, 3);
//   t.falsy(result.obj.obj_arr.includes('problem'));
//   t.snapshot(result);
// });

test('移除obj.obj_arr里isYou为true的', (t) => {
  result = remove(getObj(), 'obj.obj_arr', { isYou: true }).val();
  t.falsy(_.find(result.obj.obj_arr, { isYou: true }));
  t.snapshot(result);
});

test('移除obj.obj_arr里无匹配的', (t) => {
  result = remove(getObj(), 'obj.obj_arr', { isYou: true, notExist: true }).val();
  const length = result.obj.obj_arr.length;
  t.is(length, 4);
  t.is(result.obj.obj_arr[length - 1], 'problem');
  t.snapshot(result);
});

