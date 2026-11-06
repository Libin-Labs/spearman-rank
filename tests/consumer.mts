import { spearman } from '@lp-labs/spearman-rank';
if (Math.abs(spearman([1, 2, 3], [10, 20, 30]) - 1) > 1e-12) throw new Error('Ranks');
// @ts-expect-error invalid argument must be rejected by declarations
spearman([1, 2], ['1', '2']);
