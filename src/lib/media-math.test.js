import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import {
  calcCPM, calcImpressionsFromCPM, calcSpendFromCPM,
  calcCPC, calcClicksFromCPC, calcSpendFromCPC,
  calcCTR, calcClicksFromCTR, calcImpressionsFromCTR,
  calcCVR, calcCPA,
  calcROAS, calcRevenueFromROAS, calcSpendFromROAS, calcBreakEvenROAS,
  calcCAC, calcLtvToCac,
  calcCPV, calcViewsFromCPV, calcSpendFromCPV,
  calcPTOPerPayPeriod, calcPTOPerHour, calcPTOLumpSum,
  derivedMetrics,
} from './media-math.js';

const EPS = 1e-9;
function near(a, b) { return Math.abs(a - b) < EPS; }

// ─── CPM ─────────────────────────────────────────────────────────────────────

test('CPM: happy path', () => {
  const r = calcCPM(5000, 250000);
  assert.equal(r.error, null);
  assert(near(r.value, 20), `Expected 20, got ${r.value}`);
});

test('CPM: zero impressions returns error', () => {
  const r = calcCPM(5000, 0);
  assert(r.error !== null);
});

test('CPM: negative spend returns error', () => {
  const r = calcCPM(-100, 250000);
  assert(r.error !== null);
});

test('CPM: negative impressions returns error', () => {
  const r = calcCPM(5000, -1000);
  assert(r.error !== null);
});

test('CPM: non-numeric input returns error', () => {
  const r = calcCPM('abc', 250000);
  assert(r.error !== null);
});

test('CPM: very large numbers', () => {
  const r = calcCPM(1e12, 1e15);
  assert.equal(r.error, null);
  assert(near(r.value, 1), `Expected 1, got ${r.value}`);
});

test('CPM: zero spend returns 0', () => {
  const r = calcCPM(0, 250000);
  assert.equal(r.error, null);
  assert.equal(r.value, 0);
});

// ─── CPM round-trip ──────────────────────────────────────────────────────────

test('CPM round-trip: spend + impressions -> CPM -> back to impressions', () => {
  const spend = 5000;
  const impressions = 250000;
  const cpmR = calcCPM(spend, impressions);
  assert.equal(cpmR.error, null);
  const impressionsR = calcImpressionsFromCPM(spend, cpmR.value);
  assert.equal(impressionsR.error, null);
  assert(near(impressionsR.value, impressions), `Expected ${impressions}, got ${impressionsR.value}`);
});

test('CPM: calcSpendFromCPM happy path', () => {
  const r = calcSpendFromCPM(250000, 20);
  assert.equal(r.error, null);
  assert(near(r.value, 5000));
});

test('CPM: calcImpressionsFromCPM happy path', () => {
  const r = calcImpressionsFromCPM(5000, 20);
  assert.equal(r.error, null);
  assert(near(r.value, 250000));
});

// ─── CPC ─────────────────────────────────────────────────────────────────────

test('CPC: happy path', () => {
  const r = calcCPC(1000, 500);
  assert.equal(r.error, null);
  assert(near(r.value, 2));
});

test('CPC: zero clicks returns error', () => {
  const r = calcCPC(1000, 0);
  assert(r.error !== null);
});

test('CPC: negative clicks returns error', () => {
  const r = calcCPC(1000, -50);
  assert(r.error !== null);
});

test('CPC: non-numeric spend returns error', () => {
  const r = calcCPC(null, 500);
  assert(r.error !== null);
});

test('CPC: calcClicksFromCPC happy path', () => {
  const r = calcClicksFromCPC(1000, 2);
  assert.equal(r.error, null);
  assert(near(r.value, 500));
});

test('CPC: calcSpendFromCPC happy path', () => {
  const r = calcSpendFromCPC(500, 2);
  assert.equal(r.error, null);
  assert(near(r.value, 1000));
});

// ─── CTR ─────────────────────────────────────────────────────────────────────

test('CTR: happy path', () => {
  const r = calcCTR(250, 10000);
  assert.equal(r.error, null);
  assert(near(r.value, 2.5));
});

test('CTR: zero impressions returns error', () => {
  const r = calcCTR(250, 0);
  assert(r.error !== null);
});

test('CTR: negative clicks returns error', () => {
  const r = calcCTR(-10, 10000);
  assert(r.error !== null);
});

test('CTR: calcClicksFromCTR happy path', () => {
  const r = calcClicksFromCTR(2.5, 10000);
  assert.equal(r.error, null);
  assert(near(r.value, 250));
});

test('CTR: calcImpressionsFromCTR happy path', () => {
  const r = calcImpressionsFromCTR(250, 2.5);
  assert.equal(r.error, null);
  assert(near(r.value, 10000));
});

// ─── CVR ─────────────────────────────────────────────────────────────────────

test('CVR: happy path', () => {
  const r = calcCVR(50, 1000);
  assert.equal(r.error, null);
  assert(near(r.value, 5));
});

test('CVR: zero clicks returns error', () => {
  const r = calcCVR(50, 0);
  assert(r.error !== null);
});

// ─── CPA ─────────────────────────────────────────────────────────────────────

test('CPA: happy path', () => {
  const r = calcCPA(5000, 100);
  assert.equal(r.error, null);
  assert(near(r.value, 50));
});

test('CPA: zero conversions returns error', () => {
  const r = calcCPA(5000, 0);
  assert(r.error !== null);
});

// ─── ROAS ────────────────────────────────────────────────────────────────────

test('ROAS: happy path', () => {
  const r = calcROAS(20000, 5000);
  assert.equal(r.error, null);
  assert(near(r.value, 4));
});

test('ROAS: zero spend returns error', () => {
  const r = calcROAS(20000, 0);
  assert(r.error !== null);
});

test('ROAS: calcRevenueFromROAS happy path', () => {
  const r = calcRevenueFromROAS(4, 5000);
  assert.equal(r.error, null);
  assert(near(r.value, 20000));
});

test('ROAS: calcSpendFromROAS happy path', () => {
  const r = calcSpendFromROAS(20000, 4);
  assert.equal(r.error, null);
  assert(near(r.value, 5000));
});

test('ROAS: break-even at 40% margin = 2.5x', () => {
  const r = calcBreakEvenROAS(0.4);
  assert.equal(r.error, null);
  assert(near(r.value, 2.5));
});

test('ROAS: break-even 0 margin returns error', () => {
  const r = calcBreakEvenROAS(0);
  assert(r.error !== null);
});

test('ROAS: break-even 1.0 margin returns error', () => {
  const r = calcBreakEvenROAS(1);
  assert(r.error !== null);
});

test('ROAS: break-even negative margin returns error', () => {
  const r = calcBreakEvenROAS(-0.1);
  assert(r.error !== null);
});

// ─── CAC ─────────────────────────────────────────────────────────────────────

test('CAC: happy path', () => {
  const r = calcCAC(10000, 20000, 300);
  assert.equal(r.error, null);
  assert(near(r.value, 100));
});

test('CAC: zero customers returns error', () => {
  const r = calcCAC(10000, 20000, 0);
  assert(r.error !== null);
});

test('CAC: LTV to CAC ratio happy path', () => {
  const r = calcLtvToCac(900, 100);
  assert.equal(r.error, null);
  assert(near(r.value, 9));
});

test('CAC: LTV to CAC zero CAC returns error', () => {
  const r = calcLtvToCac(900, 0);
  assert(r.error !== null);
});

// ─── CPV ─────────────────────────────────────────────────────────────────────

test('CPV: happy path', () => {
  const r = calcCPV(1000, 50000);
  assert.equal(r.error, null);
  assert(near(r.value, 0.02));
});

test('CPV: zero views returns error', () => {
  const r = calcCPV(1000, 0);
  assert(r.error !== null);
});

test('CPV: calcViewsFromCPV happy path', () => {
  const r = calcViewsFromCPV(1000, 0.02);
  assert.equal(r.error, null);
  assert(near(r.value, 50000));
});

test('CPV: calcSpendFromCPV happy path', () => {
  const r = calcSpendFromCPV(50000, 0.02);
  assert.equal(r.error, null);
  assert(near(r.value, 1000));
});

// ─── PTO ─────────────────────────────────────────────────────────────────────

test('PTO: per pay period (bi-weekly)', () => {
  const r = calcPTOPerPayPeriod(15, 26);
  assert.equal(r.error, null);
  assert(near(r.value, 15 / 26));
});

test('PTO: per hour worked', () => {
  const r = calcPTOPerHour(15, 2080);
  assert.equal(r.error, null);
  // 15 days * 8 hours / 2080 hours
  assert(near(r.value, (15 * 8) / 2080));
});

test('PTO: lump sum', () => {
  const r = calcPTOLumpSum(15);
  assert.equal(r.error, null);
  assert.equal(r.value, 15);
});

test('PTO: zero pay periods returns error', () => {
  const r = calcPTOPerPayPeriod(15, 0);
  assert(r.error !== null);
});

// ─── Derived metrics ─────────────────────────────────────────────────────────

test('derivedMetrics: full set', () => {
  const d = derivedMetrics({ spend: 5000, impressions: 250000, clicks: 500, conversions: 50 });
  assert(near(d.cpm, 20));
  assert(near(d.cpc, 10));
  assert(near(d.ctr, 0.2));
  assert(near(d.cpa, 100));
  assert(near(d.cvr, 10));
});

test('derivedMetrics: no clicks or conversions', () => {
  const d = derivedMetrics({ spend: 5000, impressions: 250000 });
  assert(near(d.cpm, 20));
  assert(!('cpc' in d));
  assert(!('ctr' in d));
});

test('derivedMetrics: with clicks but no conversions', () => {
  const d = derivedMetrics({ spend: 5000, impressions: 250000, clicks: 500 });
  assert(near(d.cpm, 20));
  assert(near(d.cpc, 10));
  assert(!('cpa' in d));
});
