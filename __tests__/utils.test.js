const {
  convertTimestampToDateUsers,
  convertTimestampToDateTrips,
  convertTimestampToDateEvents,
} = require("../db/seeds/utils");

describe("convertTimestampToDateUsers", () => {
  test("returns a new object", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDateUsers(input);
    expect(result).not.toBe(input);
    expect(result).toBeObject();
  });

  test("converts a created_at property to a date", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDateUsers(input);
    expect(result.created_at).toBeDate();
    expect(result.created_at).toEqual(new Date(timestamp));
  });

  test("does not mutate the input", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    convertTimestampToDateUsers(input);
    const control = { created_at: timestamp };
    expect(input).toEqual(control);
  });

  test("ignores includes any other key-value-pairs in returned object", () => {
    const input = { created_at: 0, key1: true, key2: 1 };
    const result = convertTimestampToDateUsers(input);
    expect(result.key1).toBe(true);
    expect(result.key2).toBe(1);
  });

  test("returns unchanged object if no created_at property", () => {
    const input = { key: "value" };
    const result = convertTimestampToDateUsers(input);
    const expected = { key: "value" };
    expect(result).toEqual(expected);
  });
});

describe("convertTimestampToDateTrips", () => {
  test("returns a new object", () => {
    const timestampStart = 1701388800000;
    const timestampEnd = 1702339200000;
    const input = { start_date: timestampStart, end_date: timestampEnd };
    const result = convertTimestampToDateTrips(input);
    expect(result).not.toBe(input);
    expect(result).toBeObject();
  });

  test("converts a start_date property and end_date to a date", () => {
    const timestampStart = 1701388800000;
    const timestampEnd = 1702339200000;
    const input = { start_date: timestampStart, end_date: timestampEnd };
    const result = convertTimestampToDateTrips(input);
    expect(result.start_date).toBeDate();
    expect(result.end_date).toBeDate();
    expect(result.start_date).toEqual(new Date(timestampStart));
    expect(result.end_date).toEqual(new Date(timestampEnd));
  });

  test("does not mutate the input", () => {
    const timestampStart = 1701388800000;
    const timestampEnd = 1702339200000;
    const input = { start_date: timestampStart, end_date: timestampEnd };
    convertTimestampToDateTrips(input);
    const control = { start_date: timestampStart, end_date: timestampEnd };
    expect(input).toEqual(control);
  });

  test("ignores includes any other key-value-pairs in returned object", () => {
    const input = { start_date: 0, end_date: 1, key1: true, key2: 1 };
    const result = convertTimestampToDateTrips(input);
    expect(result.key1).toBe(true);
    expect(result.key2).toBe(1);
  });

  test("returns unchanged object if no start_date property", () => {
    const input = { key: "value" };
    const result = convertTimestampToDateTrips(input);
    const expected = { key: "value" };
    expect(result).toEqual(expected);
  });
});

describe("convertTimestampToDateEvents", () => {
  test("returns a new object", () => {
    const timestamp = 1697043600000;
    const input = { date: timestamp };
    const result = convertTimestampToDateEvents(input);
    expect(result).not.toBe(input);
    expect(result).toBeObject();
  });

  test("converts a date property to a date", () => {
    const timestamp = 1697043600000;
    const input = { date: timestamp };
    const result = convertTimestampToDateEvents(input);
    expect(result.date).toBeDate();
    expect(result.date).toEqual(new Date(timestamp));
  });

  test("does not mutate the input", () => {
    const timestamp = 1697043600000;
    const input = { date: timestamp };
    convertTimestampToDateEvents(input);
    const control = { date: timestamp };
    expect(input).toEqual(control);
  });

  test("ignores includes any other key-value-pairs in returned object", () => {
    const input = { date: 0, key1: true, key2: 1 };
    const result = convertTimestampToDateEvents(input);
    expect(result.key1).toBe(true);
    expect(result.key2).toBe(1);
  });
  
  test("returns unchanged object if no date property", () => {
    const input = { key: "value" };
    const result = convertTimestampToDateEvents(input);
    const expected = { key: "value" };
    expect(result).toEqual(expected);
  });
});
