/**
 * Media math engine — pure functions, no DOM, no side effects.
 * Every function returns { value: number, error: string|null }.
 * Never returns NaN, Infinity, undefined, or -0 to the caller.
 */

function ok(value) {
  return { value, error: null };
}

function err(message) {
  return { value: null, error: message };
}

function isValidNumber(n) {
  return typeof n === 'number' && isFinite(n) && !isNaN(n);
}

function parseInput(raw) {
  if (raw === null || raw === undefined || raw === '') return err('Value is required.');
  const n = Number(raw);
  if (!isFinite(n) || isNaN(n)) return err('Must be a valid number.');
  return ok(n);
}

function requirePositive(raw, label) {
  const p = parseInput(raw);
  if (p.error) return p;
  if (p.value < 0) return err(`${label} cannot be negative.`);
  return p;
}

function requireStrictlyPositive(raw, label) {
  const p = parseInput(raw);
  if (p.error) return p;
  if (p.value <= 0) return err(`${label} must be greater than zero.`);
  return p;
}

// ─── CPM ────────────────────────────────────────────────────────────────────

export function calcCPM(spend, impressions) {
  const s = requirePositive(spend, 'Spend');
  if (s.error) return s;
  const i = requireStrictlyPositive(impressions, 'Impressions');
  if (i.error) return i;
  return ok((s.value / i.value) * 1000);
}

export function calcImpressionsFromCPM(spend, cpm) {
  const s = requirePositive(spend, 'Spend');
  if (s.error) return s;
  const c = requireStrictlyPositive(cpm, 'CPM');
  if (c.error) return c;
  return ok((s.value / c.value) * 1000);
}

export function calcSpendFromCPM(impressions, cpm) {
  const i = requirePositive(impressions, 'Impressions');
  if (i.error) return i;
  const c = requirePositive(cpm, 'CPM');
  if (c.error) return c;
  return ok((i.value / 1000) * c.value);
}

// ─── CPC ────────────────────────────────────────────────────────────────────

export function calcCPC(spend, clicks) {
  const s = requirePositive(spend, 'Spend');
  if (s.error) return s;
  const c = requireStrictlyPositive(clicks, 'Clicks');
  if (c.error) return c;
  return ok(s.value / c.value);
}

export function calcClicksFromCPC(spend, cpc) {
  const s = requirePositive(spend, 'Spend');
  if (s.error) return s;
  const c = requireStrictlyPositive(cpc, 'CPC');
  if (c.error) return c;
  return ok(s.value / c.value);
}

export function calcSpendFromCPC(clicks, cpc) {
  const c = requirePositive(clicks, 'Clicks');
  if (c.error) return c;
  const p = requirePositive(cpc, 'CPC');
  if (p.error) return p;
  return ok(c.value * p.value);
}

// ─── CTR ────────────────────────────────────────────────────────────────────

export function calcCTR(clicks, impressions) {
  const c = requirePositive(clicks, 'Clicks');
  if (c.error) return c;
  const i = requireStrictlyPositive(impressions, 'Impressions');
  if (i.error) return i;
  return ok((c.value / i.value) * 100);
}

export function calcClicksFromCTR(ctr, impressions) {
  const r = requirePositive(ctr, 'CTR');
  if (r.error) return r;
  const i = requirePositive(impressions, 'Impressions');
  if (i.error) return i;
  return ok((r.value / 100) * i.value);
}

export function calcImpressionsFromCTR(clicks, ctr) {
  const c = requirePositive(clicks, 'Clicks');
  if (c.error) return c;
  const r = requireStrictlyPositive(ctr, 'CTR');
  if (r.error) return r;
  return ok((c.value / r.value) * 100);
}

// ─── CVR ────────────────────────────────────────────────────────────────────

export function calcCVR(conversions, clicks) {
  const cv = requirePositive(conversions, 'Conversions');
  if (cv.error) return cv;
  const c = requireStrictlyPositive(clicks, 'Clicks');
  if (c.error) return c;
  return ok((cv.value / c.value) * 100);
}

// ─── CPA ────────────────────────────────────────────────────────────────────

export function calcCPA(spend, conversions) {
  const s = requirePositive(spend, 'Spend');
  if (s.error) return s;
  const c = requireStrictlyPositive(conversions, 'Conversions');
  if (c.error) return c;
  return ok(s.value / c.value);
}

// ─── ROAS ───────────────────────────────────────────────────────────────────

export function calcROAS(revenue, spend) {
  const r = requirePositive(revenue, 'Revenue');
  if (r.error) return r;
  const s = requireStrictlyPositive(spend, 'Spend');
  if (s.error) return s;
  return ok(r.value / s.value);
}

export function calcRevenueFromROAS(roas, spend) {
  const r = requirePositive(roas, 'ROAS');
  if (r.error) return r;
  const s = requirePositive(spend, 'Spend');
  if (s.error) return s;
  return ok(r.value * s.value);
}

export function calcSpendFromROAS(revenue, roas) {
  const rev = requirePositive(revenue, 'Revenue');
  if (rev.error) return rev;
  const r = requireStrictlyPositive(roas, 'ROAS');
  if (r.error) return r;
  return ok(rev.value / r.value);
}

export function calcBreakEvenROAS(grossMargin) {
  const m = parseInput(grossMargin);
  if (m.error) return m;
  if (m.value <= 0 || m.value >= 1) return err('Gross margin must be between 0% and 100% (exclusive).');
  return ok(1 / m.value);
}

// ─── CAC ────────────────────────────────────────────────────────────────────

export function calcCAC(salesSpend, marketingSpend, newCustomers) {
  const ss = requirePositive(salesSpend, 'Sales spend');
  if (ss.error) return ss;
  const ms = requirePositive(marketingSpend, 'Marketing spend');
  if (ms.error) return ms;
  const nc = requireStrictlyPositive(newCustomers, 'New customers');
  if (nc.error) return nc;
  return ok((ss.value + ms.value) / nc.value);
}

export function calcLtvToCac(ltv, cac) {
  const l = requirePositive(ltv, 'LTV');
  if (l.error) return l;
  const c = requireStrictlyPositive(cac, 'CAC');
  if (c.error) return c;
  return ok(l.value / c.value);
}

// ─── CPV ────────────────────────────────────────────────────────────────────

export function calcCPV(spend, views) {
  const s = requirePositive(spend, 'Spend');
  if (s.error) return s;
  const v = requireStrictlyPositive(views, 'Views');
  if (v.error) return v;
  return ok(s.value / v.value);
}

export function calcViewsFromCPV(spend, cpv) {
  const s = requirePositive(spend, 'Spend');
  if (s.error) return s;
  const c = requireStrictlyPositive(cpv, 'CPV');
  if (c.error) return c;
  return ok(s.value / c.value);
}

export function calcSpendFromCPV(views, cpv) {
  const v = requirePositive(views, 'Views');
  if (v.error) return v;
  const c = requirePositive(cpv, 'CPV');
  if (c.error) return c;
  return ok(v.value * c.value);
}

// ─── PTO ─────────────────────────────────────────────────────────────────────

export function calcPTOPerPayPeriod(annualDays, payPeriodsPerYear) {
  const d = requirePositive(annualDays, 'Annual PTO days');
  if (d.error) return d;
  const p = requireStrictlyPositive(payPeriodsPerYear, 'Pay periods per year');
  if (p.error) return p;
  return ok(d.value / p.value);
}

export function calcPTOPerHour(annualDays, annualHoursWorked) {
  const d = requirePositive(annualDays, 'Annual PTO days');
  if (d.error) return d;
  const h = requireStrictlyPositive(annualHoursWorked, 'Annual hours worked');
  if (h.error) return h;
  // convert days to hours (8h/day), then divide by hours worked
  return ok((d.value * 8) / h.value);
}

export function calcPTOLumpSum(annualDays) {
  return requirePositive(annualDays, 'Annual PTO days');
}

// ─── Derived metrics (bonus on CPM page) ────────────────────────────────────

export function derivedMetrics({ spend, impressions, clicks, conversions }) {
  const results = {};

  const cpmR = calcCPM(spend, impressions);
  if (!cpmR.error) results.cpm = cpmR.value;

  if (clicks !== undefined && clicks !== null && clicks !== '') {
    const cpcR = calcCPC(spend, clicks);
    if (!cpcR.error) results.cpc = cpcR.value;

    const ctrR = calcCTR(clicks, impressions);
    if (!ctrR.error) results.ctr = ctrR.value;

    if (conversions !== undefined && conversions !== null && conversions !== '') {
      const cpaR = calcCPA(spend, conversions);
      if (!cpaR.error) results.cpa = cpaR.value;

      const cvrR = calcCVR(conversions, clicks);
      if (!cvrR.error) results.cvr = cvrR.value;
    }
  }

  return results;
}
