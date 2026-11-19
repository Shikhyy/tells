// IANA renames and backward-compatibility links. The browser (Intl) and the IP
// geolocation source can each report a different name for the same zone, for
// example Asia/Calcutta and Asia/Kolkata, so names are compared by canonical
// zone and not as raw strings. Keys are lower case; values are the current name.
const TIMEZONE_ALIASES = Object.freeze({
  "africa/asmera": "Africa/Asmara",
  "africa/timbuktu": "Africa/Bamako",
  "america/buenos_aires": "America/Argentina/Buenos_Aires",
  "america/catamarca": "America/Argentina/Catamarca",
  "america/cordoba": "America/Argentina/Cordoba",
  "america/fort_wayne": "America/Indiana/Indianapolis",
  "america/godthab": "America/Nuuk",
  "america/indianapolis": "America/Indiana/Indianapolis",
  "america/jujuy": "America/Argentina/Jujuy",
  "america/louisville": "America/Kentucky/Louisville",
  "america/mendoza": "America/Argentina/Mendoza",
  "america/montreal": "America/Toronto",
  "asia/calcutta": "Asia/Kolkata",
  "asia/chongqing": "Asia/Shanghai",
  "asia/chungking": "Asia/Shanghai",
  "asia/dacca": "Asia/Dhaka",
  "asia/harbin": "Asia/Shanghai",
  "asia/istanbul": "Europe/Istanbul",
  "asia/kashgar": "Asia/Urumqi",
  "asia/katmandu": "Asia/Kathmandu",
  "asia/macao": "Asia/Macau",
  "asia/rangoon": "Asia/Yangon",
  "asia/saigon": "Asia/Ho_Chi_Minh",
  "asia/thimbu": "Asia/Thimphu",
  "asia/ujung_pandang": "Asia/Makassar",
  "atlantic/faeroe": "Atlantic/Faroe",
  "australia/act": "Australia/Sydney",
  "australia/canberra": "Australia/Sydney",
  "australia/nsw": "Australia/Sydney",
  "australia/queensland": "Australia/Brisbane",
  "australia/victoria": "Australia/Melbourne",
  "europe/belfast": "Europe/London",
  "europe/kiev": "Europe/Kyiv",
  "pacific/ponape": "Pacific/Pohnpei",
  "pacific/samoa": "Pacific/Pago_Pago",
  "pacific/truk": "Pacific/Chuuk",
  "us/alaska": "America/Anchorage",
  "us/arizona": "America/Phoenix",
  "us/central": "America/Chicago",
  "us/eastern": "America/New_York",
  "us/hawaii": "Pacific/Honolulu",
  "us/mountain": "America/Denver",
  "us/pacific": "America/Los_Angeles",
  // Zero-offset, no-DST names that all mean UTC.
  "etc/gmt": "UTC",
  "etc/gmt+0": "UTC",
  "etc/gmt-0": "UTC",
  "etc/gmt0": "UTC",
  "etc/greenwich": "UTC",
  "etc/uct": "UTC",
  "etc/universal": "UTC",
  "etc/utc": "UTC",
  "etc/zulu": "UTC",
  "gmt": "UTC",
  "gmt0": "UTC",
  "greenwich": "UTC",
  "uct": "UTC",
  "universal": "UTC",
  "utc": "UTC",
  "zulu": "UTC"
});

// Returns the lower-cased canonical zone name, for comparison only.
export function canonicalTimezone(name) {
  if (typeof name !== "string") return null;
  const trimmed = name.trim();
  if (!trimmed) return null;
  const key = trimmed.toLowerCase();
  return (TIMEZONE_ALIASES[key] ?? key).toLowerCase();
}

export function sameTimezone(a, b) {
  const left = canonicalTimezone(a);
  const right = canonicalTimezone(b);
  return left !== null && left === right;
}
