function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
function sample(values: readonly number[]): void {
  if (!Array.isArray(values) || !values.length || values.length > 100000)
    throw new RangeError('Sample size1..100000');
  for (const v of values) finite(v);
}
function ranks(values: readonly number[]): number[] {
  const pairs = values.map((v, i) => ({ v, i })).sort((a, b) => a.v - b.v);
  const out = Array<number>(values.length).fill(0);
  for (let i = 0; i < pairs.length;) {
    let end = i + 1;
    while (end < pairs.length && pairs[end]!.v === pairs[i]!.v) end++;
    const rank = (i + 1 + end) / 2;
    for (let j = i; j < end; j++) out[pairs[j]!.i] = rank;
    i = end;
  }
  return out;
}
export function spearman(x: readonly number[], y: readonly number[]): number {
  sample(x);
  sample(y);
  if (x.length !== y.length || x.length < 2)
    throw new RangeError('Equal paired samples>=2 required');
  const a = ranks(x),
    b = ranks(y),
    mean = (x.length + 1) / 2;
  let xx = 0,
    yy = 0,
    xy = 0;
  for (let i = 0; i < a.length; i++) {
    const dx = a[i]! - mean,
      dy = b[i]! - mean;
    xx += dx * dx;
    yy += dy * dy;
    xy += dx * dy;
  }
  if (xx === 0 || yy === 0) throw new RangeError('Constant ranks');
  return Math.max(-1, Math.min(1, xy / Math.sqrt(xx) / Math.sqrt(yy)));
}
