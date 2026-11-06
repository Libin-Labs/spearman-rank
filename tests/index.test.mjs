import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('monotonic', () => {
  assert.ok(Math.abs(api.spearman([1, 2, 3], [10, 20, 30]) - 1) < 1e-14);
});
test('reverse', () => {
  assert.ok(Math.abs(api.spearman([1, 2, 3], [30, 20, 10]) + 1) < 1e-14);
});
test('known ranking', () => {
  assert.ok(Math.abs(api.spearman([1, 2, 3, 4], [1, 3, 2, 4]) - 0.8) < 1e-14);
});
test('ties average', () => {
  assert.ok(Math.abs(api.spearman([1, 1, 2], [1, 2, 3]) - Math.sqrt(3) / 2) < 1e-14);
});
test('order invariant', () => {
  assert.ok(Math.abs(api.spearman([3, 1, 2], [30, 10, 20]) - 1) < 1e-14);
});
test('invalid samples', () => {
  assert.throws(() => api.spearman([1, 1], [2, 3]));
  assert.throws(() => api.spearman([1, 2], [3]));
  assert.throws(() => api.spearman([1, NaN], [2, 3]));
});
