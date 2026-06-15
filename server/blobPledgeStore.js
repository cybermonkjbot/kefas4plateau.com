import { get, list, put } from "@vercel/blob";

const PLEDGE_PREFIX = "pledges/";
const pageSize = 1000;

export async function getBlobPledgeCount() {
  const pledges = await listAllPledges();
  return pledges.length;
}

export async function getBlobPledgeDashboard({ search = "", limit = 150 } = {}) {
  const normalizedSearch = search.trim().toLowerCase();
  const safeLimit = Math.max(1, Math.min(500, Number.parseInt(String(limit), 10) || 150));
  const pledges = await listAllPledges();
  const filteredPledges = normalizedSearch
    ? pledges.filter((pledge) => pledgeMatchesSearch(pledge, normalizedSearch))
    : pledges;

  return {
    summary: {
      totalPledges: pledges.length,
      selfieCount: pledges.filter((pledge) => pledge.hasSelfie).length,
      pledgesLastDay: pledges.filter((pledge) => isWithinDays(pledge.submittedAt, 1)).length,
      pledgesLastWeek: pledges.filter((pledge) => isWithinDays(pledge.submittedAt, 7)).length,
      filteredCount: filteredPledges.length,
    },
    roles: summarizeByField(pledges, "role"),
    focusAreas: summarizeByField(pledges, "focus"),
    pledges: filteredPledges
      .slice()
      .sort((left, right) => right.submittedAt.localeCompare(left.submittedAt))
      .slice(0, safeLimit)
      .map(stripBlobInternalFields),
  };
}

export async function createBlobPledge(pledge) {
  const pathname = `${PLEDGE_PREFIX}${pledge.submittedAt.slice(0, 10)}/${pledge.id}.json`;

  await put(pathname, JSON.stringify(pledge), {
    access: "private",
    addRandomSuffix: false,
    contentType: "application/json; charset=utf-8",
  });

  const count = await getBlobPledgeCount();
  return { count, id: pledge.id };
}

async function listAllPledges() {
  const blobs = [];
  let cursor;

  do {
    const page = await list({
      cursor,
      limit: pageSize,
      prefix: PLEDGE_PREFIX,
    });

    blobs.push(...page.blobs);
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  const pledgeResponses = await Promise.all(
    blobs
      .filter((blob) => blob.pathname.endsWith(".json"))
      .map(async (blob) => {
        const response = await get(blob.pathname, {
          access: "private",
          useCache: false,
        });

        if (!response || response.statusCode !== 200 || !response.stream) {
          throw new Error(`Unable to fetch blob pledge ${blob.pathname}.`);
        }

        const body = await new Response(response.stream).json();
        return body;
      }),
  );

  return pledgeResponses.map(normalizeBlobPledge);
}

function normalizeBlobPledge(pledge) {
  return {
    id: pledge.id || "",
    submittedAt: pledge.submittedAt || new Date(0).toISOString(),
    name: pledge.name || "",
    email: pledge.email || "",
    phone: pledge.phone || "",
    ageBand: pledge.ageBand || "",
    role: pledge.role || "",
    focus: pledge.focus || "",
    location: pledge.location || "",
    availability: pledge.availability || "",
    note: pledge.note || "",
    hasSelfie: Boolean(pledge.hasSelfie),
    source: pledge.source || "website",
    ipAddress: pledge.ipAddress || "",
    userAgent: pledge.userAgent || "",
  };
}

function stripBlobInternalFields(pledge) {
  return {
    id: pledge.id,
    submittedAt: pledge.submittedAt,
    name: pledge.name,
    email: pledge.email,
    phone: pledge.phone,
    ageBand: pledge.ageBand,
    role: pledge.role,
    focus: pledge.focus,
    location: pledge.location,
    availability: pledge.availability,
    note: pledge.note,
    hasSelfie: pledge.hasSelfie,
    source: pledge.source,
    ipAddress: pledge.ipAddress,
    userAgent: pledge.userAgent,
  };
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

function isWithinDays(submittedAt, dayCount) {
  const submittedTime = Date.parse(submittedAt);

  if (Number.isNaN(submittedTime)) {
    return false;
  }

  return submittedTime >= Date.now() - dayCount * 24 * 60 * 60 * 1000;
}

function pledgeMatchesSearch(pledge, normalizedSearch) {
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
