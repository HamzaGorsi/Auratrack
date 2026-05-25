type CacheEntry = {
  data: any;
  expiry: number;
};

const cache = new Map<
  string,
  CacheEntry
>();

export function getCache(
  key: string
) {
  const entry =
    cache.get(key);

  if (!entry) {
    return null;
  }

  if (Date.now() > entry.expiry) {
    cache.delete(key);

    return null;
  }

  return entry.data;
}

export function setCache(
  key: string,
  data: any,
  ttl = 60000
) {
  cache.set(key, {
    data,
    expiry: Date.now() + ttl,
  });
}