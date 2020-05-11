function extractPageFromUrl(url) {
  const page = /_page=([0-9]*)/.exec(url);
  if (Array.isArray(page) && page.length > 1) return page[1];
  return null;
}

function extractKeyFromRel(rel) {
  const key = /rel="([a-zA-z]*)"/.exec(rel);
  if (Array.isArray(key) && key.length > 1) return key[1];
  return null;
}


// takes the Link header from a request and extracts the relevant
// parameters for later pagination (such as prev, next, limit, etc).
export function parseLinkHeader(link) {
  const pagination = link
    .split(",")
    .map((line) => line.split(";"))
    .reduce((result, [url, rel]) => {
      const page = extractPageFromUrl(url);
      const key = extractKeyFromRel(rel);
      if (page && key) {
        result[key] = parseInt(page, 10);
      }
      return result;
    }, {});
  return pagination;
}
