import { clamp, sigmoid } from "./stats";

/*
 * Logistic regression with L2 shrinkage, fitted by gradient descent.
 * Deliberately small: few features, strong regularisation. On noisy price data a flexible model fits the past and fails live.
 */
export interface Fit { w: number[]; b: number; mu: number[]; sigma: number[]; n: number }

export function standardise(X: number[][]) {
  const d = X[0]?.length ?? 0;
  const mu = Array.from({ length: d }, (_, j) => X.reduce((s, r) => s + r[j], 0) / (X.length || 1));
  const sigma = Array.from({ length: d }, (_, j) => {
    const v = X.reduce((s, r) => s + (r[j] - mu[j]) ** 2, 0) / Math.max(1, X.length - 1);
    return Math.sqrt(v) || 1;
  });
  return { mu, sigma };
}

export function fitLogit(X: number[][], y: (0 | 1)[], opts: { l2?: number; steps?: number; lr?: number } = {}): Fit {
  const l2 = opts.l2 ?? 1, steps = opts.steps ?? 600, lr = opts.lr ?? 0.1;
  const d = X[0]?.length ?? 0, n = X.length || 1;
  const { mu, sigma } = standardise(X);
  const Z = X.map((r) => r.map((v, j) => (v - mu[j]) / sigma[j]));
  const base = (y.filter(Boolean).length + 1) / (n + 2);
  const w = new Array(d).fill(0);
  let b = Math.log(base / (1 - base));
  for (let s = 0; s < steps; s++) {
    const gw = new Array(d).fill(0); let gb = 0;
    for (let i = 0; i < X.length; i++) {
      const e = sigmoid(Z[i].reduce((acc, v, j) => acc + v * w[j], b)) - y[i];
      for (let j = 0; j < d; j++) gw[j] += e * Z[i][j];
      gb += e;
    }
    for (let j = 0; j < d; j++) w[j] -= lr * (gw[j] / n + (l2 * w[j]) / n);
    b -= lr * (gb / n);
  }
  return { w, b, mu, sigma, n: X.length };
}

export const predictLogit = (fit: Fit, x: number[]) =>
  clamp(sigmoid(x.reduce((acc, v, j) => acc + ((v - fit.mu[j]) / fit.sigma[j]) * fit.w[j], fit.b)), 0.02, 0.98);

/** Platt-style recalibration of raw probabilities, fitted on out-of-sample calls only. */
export interface Calibration { a: number; b: number; n: number }
export const IDENTITY: Calibration = { a: 1, b: 0, n: 0 };
const logit = (p: number) => Math.log(clamp(p, 1e-6, 1 - 1e-6) / (1 - clamp(p, 1e-6, 1 - 1e-6)));
export function fitCalibration(rows: { p: number; y: 0 | 1 }[], min = 60): Calibration {
  if (rows.length < min) return IDENTITY;
  const f = fitLogit(rows.map((r) => [logit(r.p)]), rows.map((r) => r.y), { l2: 0.5, steps: 500, lr: 0.3 });
  const a = f.w[0] / f.sigma[0];
  return { a, b: f.b - a * f.mu[0], n: rows.length };
}
export const applyCalibration = (c: Calibration, p: number) => (c.n === 0 ? p : clamp(sigmoid(c.a * logit(p) + c.b), 0.02, 0.98));
