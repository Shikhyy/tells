import { describe, expect, it } from "vitest";
import { enrichClientConsistency } from "../src/report-verdict.js";
import { canonicalTimezone, sameTimezone } from "../src/timezone.js";

describe("timezone aliases", () => {
  it("treats renamed and linked IANA names as the same zone", () => {
    expect(sameTimezone("Asia/Calcutta", "Asia/Kolkata")).toBe(true);
    expect(sameTimezone("Asia/Kolkata", "Asia/Calcutta")).toBe(true);
    expect(sameTimezone("Europe/Kiev", "Europe/Kyiv")).toBe(true);
    expect(sameTimezone("Asia/Saigon", "Asia/Ho_Chi_Minh")).toBe(true);
    expect(sameTimezone("America/Buenos_Aires", "America/Argentina/Buenos_Aires")).toBe(true);
    expect(sameTimezone("US/Eastern", "America/New_York")).toBe(true);
  });

  it("treats the zero-offset UTC names as one zone", () => {
    expect(sameTimezone("UTC", "Etc/UTC")).toBe(true);
    expect(sameTimezone("Etc/GMT", "UTC")).toBe(true);
  });

  it("ignores case and surrounding whitespace", () => {
    expect(sameTimezone(" asia/calcutta ", "Asia/Kolkata")).toBe(true);
    expect(sameTimezone("europe/london", "Europe/London")).toBe(true);
  });

  it("keeps different zones different, including look-alikes", () => {
    expect(sameTimezone("Asia/Kolkata", "Asia/Dhaka")).toBe(false);
    expect(sameTimezone("Europe/London", "UTC")).toBe(false);
    expect(sameTimezone("America/Chicago", "America/New_York")).toBe(false);
  });

  it("never matches missing or non-string values", () => {
    expect(sameTimezone(null, null)).toBe(false);
    expect(sameTimezone("", "")).toBe(false);
    expect(sameTimezone(undefined, "UTC")).toBe(false);
    expect(sameTimezone(5, 5)).toBe(false);
    expect(canonicalTimezone(null)).toBeNull();
  });
});

describe("timezone consistency check", () => {
  const consistencyFor = (browserTimezone, ipTimezone) => enrichClientConsistency(
    { browser: { timezone: browserTimezone }, consistency: {} },
    { cf: { timezone: ipTimezone } }
  ).consistency;

  it("does not flag Asia/Calcutta against Asia/Kolkata", () => {
    expect(consistencyFor("Asia/Calcutta", "Asia/Kolkata").timezoneMismatch).toBeUndefined();
    expect(consistencyFor("Asia/Kolkata", "Asia/Calcutta").timezoneMismatch).toBeUndefined();
  });

  it("still flags a real timezone mismatch", () => {
    expect(consistencyFor("Europe/London", "Asia/Kolkata").timezoneMismatch)
      .toEqual({ browserTimezone: "Europe/London", ipTimezone: "Asia/Kolkata" });
  });
});
