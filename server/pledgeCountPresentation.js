const demoModeEnabled = (process.env.PLEDGE_COUNT_MODE || "").trim().toLowerCase() === "demo";
const demoJitterMax = Math.max(
  0,
  Number.parseInt(process.env.PLEDGE_COUNT_DEMO_JITTER_MAX || "11", 10) || 0,
);
const demoSalt = process.env.PLEDGE_COUNT_DEMO_SALT || "kefas-demo";

export function presentPledgeCount(realCount) {
  if (!demoModeEnabled) {
    return {
      count: realCount,
      realCount,
      mode: "real",
    };
  }

  const jitter = getDeterministicJitter(realCount, demoJitterMax);
  return {
    count: Math.floor(realCount * 1.5 + 21 + jitter),
    realCount,
    mode: "demo",
  };
}

function getDeterministicJitter(realCount, max) {
  if (max <= 0) return 0;

  const minuteBucket = Math.floor(Date.now() / 60000);
  const seed = `${demoSalt}:${realCount}:${minuteBucket}`;
  let hash = 0;

  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) >>> 0;
  }

  return hash % (max + 1);
}
