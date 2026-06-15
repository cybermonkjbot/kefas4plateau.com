const fallbackPublicBaseCount = 4500;
const fallbackStorageKey = "kefas-fallback-pledges";

export function getFallbackPresentedCount() {
  return fallbackPublicBaseCount + getFallbackPledges().length;
}

export function saveFallbackPledge(input) {
  const pledge = {
    id: input.id || createFallbackId(),
    submittedAt: input.submittedAt || new Date().toISOString(),
    name: input.name || "",
    email: input.email || "",
    phone: input.phone || "",
    ageBand: input.ageBand || "",
    role: input.role || "",
    focus: input.focus || "",
    location: input.location || "",
    availability: input.availability || "",
    note: input.note || "",
    hasSelfie: Boolean(input.selfieDataUrl),
    source: "local fallback",
    ipAddress: "",
    userAgent: readUserAgent(),
  };

  const pledges = getFallbackPledges();
  pledges.unshift(pledge);
  writeFallbackPledges(pledges);

  return pledge;
}

export function buildFallbackDashboard(search = "") {
  const pledges = getFallbackPledges();
  const normalizedSearch = search.trim().toLowerCase();
  const filteredPledges = normalizedSearch
    ? pledges.filter((pledge) => matchesSearch(pledge, normalizedSearch))
    : pledges;

  return {
    ok: true,
    isFallback: true,
    countPresentation: {
      count: fallbackPublicBaseCount + pledges.length,
      realCount: pledges.length,
      mode: "demo",
    },
    summary: {
      totalPledges: pledges.length,
      selfieCount: pledges.filter((pledge) => pledge.hasSelfie).length,
      pledgesLastDay: pledges.filter((pledge) => isWithinDays(pledge.submittedAt, 1)).length,
      pledgesLastWeek: pledges.filter((pledge) => isWithinDays(pledge.submittedAt, 7)).length,
      filteredCount: filteredPledges.length,
    },
    roles: summarizeByField(pledges, "role"),
    focusAreas: summarizeByField(pledges, "focus"),
    pledges: filteredPledges.slice(0, 150),
  };
}

export function getFallbackPledges() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(fallbackStorageKey);
    const parsed = JSON.parse(raw || "[]");

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((pledge) => pledge && typeof pledge === "object")
      .map((pledge) => ({
        id: String(pledge.id || createFallbackId()),
        submittedAt: String(pledge.submittedAt || new Date(0).toISOString()),
        name: String(pledge.name || ""),
        email: String(pledge.email || ""),
        phone: String(pledge.phone || ""),
        ageBand: String(pledge.ageBand || ""),
        role: String(pledge.role || ""),
        focus: String(pledge.focus || ""),
        location: String(pledge.location || ""),
        availability: String(pledge.availability || ""),
        note: String(pledge.note || ""),
        hasSelfie: Boolean(pledge.hasSelfie),
        source: String(pledge.source || "local fallback"),
        ipAddress: String(pledge.ipAddress || ""),
        userAgent: String(pledge.userAgent || ""),
      }))
      .sort((left, right) => right.submittedAt.localeCompare(left.submittedAt));
  } catch {
    return [];
  }
}

function writeFallbackPledges(pledges) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(fallbackStorageKey, JSON.stringify(pledges));
}

function summarizeByField(pledges, field) {
  return Array.from(
    pledges.reduce((summary, pledge) => {
      const key = pledge[field] || "";

      if (!key) {
        return summary;
      }

      summary.set(key, (summary.get(key) || 0) + 1);
      return summary;
    }, new Map()),
  )
    .map(([value, count]) => ({ [field]: value, count }))
    .sort((left, right) => right.count - left.count || left[field].localeCompare(right[field]));
}

function matchesSearch(pledge, normalizedSearch) {
  return [
    pledge.name,
    pledge.email,
    pledge.phone,
    pledge.role,
    pledge.focus,
    pledge.location,
    pledge.availability,
    pledge.note,
  ].some((value) => value.toLowerCase().includes(normalizedSearch));
}

function isWithinDays(submittedAt, dayCount) {
  const submittedTime = Date.parse(submittedAt);

  if (Number.isNaN(submittedTime)) {
    return false;
  }

  return submittedTime >= Date.now() - dayCount * 24 * 60 * 60 * 1000;
}

function readUserAgent() {
  if (typeof navigator === "undefined") {
    return "";
  }

  return navigator.userAgent || "";
}

function createFallbackId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `fallback-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
