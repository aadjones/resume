import { describe, it, expect } from "vitest";

// Helper function to get a random unused item from an array
const getRandomUnused = (
  items: readonly string[],
  usedSet: Set<string>,
): string | null => {
  const unusedItems = items.filter((item) => !usedSet.has(item));
  if (unusedItems.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * unusedItems.length);
  const selectedItem = unusedItems[randomIndex];
  return selectedItem;
};

// Helper function to get a random date range that's chronologically valid
const getRandomDateRange = (
  dateRanges: readonly string[],
  jobIndex: number,
): string => {
  // For first job, allow any date range
  if (jobIndex === 0) {
    return dateRanges[Math.floor(Math.random() * dateRanges.length)];
  }

  // For subsequent jobs, filter out ranges ending with "Present"
  const validRanges = dateRanges.filter((range) => !range.endsWith("Present"));
  return validRanges[Math.floor(Math.random() * validRanges.length)];
};

// Helper function to generate responsibilities
const generateResponsibilities = (
  responsibilities: readonly string[],
  usedSet: Set<string>,
): string[] => {
  const localUsedResponsibilities = new Set<string>();
  return Array(3)
    .fill("")
    .map(() => {
      let randomResp;
      do {
        randomResp =
          responsibilities[Math.floor(Math.random() * responsibilities.length)];
      } while (localUsedResponsibilities.has(randomResp));
      localUsedResponsibilities.add(randomResp);
      return randomResp;
    });
};

describe("Duplicate Prevention", () => {
  const testItems = ["A", "B", "C", "D", "E"];
  const usedSet = new Set<string>();

  it("should return unused items until all are used", () => {
    // First selection should be from all items
    const first = getRandomUnused(testItems, usedSet);
    expect(first).toBeTruthy();
    expect(testItems).toContain(first);
    usedSet.add(first!);

    // Second selection should not include the first item
    const second = getRandomUnused(testItems, usedSet);
    expect(second).toBeTruthy();
    expect(second).not.toBe(first);
    usedSet.add(second!);

    // Third selection should not include first or second
    const third = getRandomUnused(testItems, usedSet);
    expect(third).toBeTruthy();
    expect(third).not.toBe(first);
    expect(third).not.toBe(second);
    usedSet.add(third!);

    // Fourth selection should not include first, second, or third
    const fourth = getRandomUnused(testItems, usedSet);
    expect(fourth).toBeTruthy();
    expect(fourth).not.toBe(first);
    expect(fourth).not.toBe(second);
    expect(fourth).not.toBe(third);
    usedSet.add(fourth!);

    // Fifth selection should not include any previous items
    const fifth = getRandomUnused(testItems, usedSet);
    expect(fifth).toBeTruthy();
    expect(fifth).not.toBe(first);
    expect(fifth).not.toBe(second);
    expect(fifth).not.toBe(third);
    expect(fifth).not.toBe(fourth);
  });

  it("should return null when all items are used", () => {
    // Add all items to used set
    testItems.forEach((item) => usedSet.add(item));

    // Next selection should return null
    const result = getRandomUnused(testItems, usedSet);
    expect(result).toBeNull();
  });
});

describe("Date Range Validation", () => {
  const dateRanges = [
    "2020-2022",
    "2021-2023",
    "2022-Present",
    "2023-Present",
    "2019-2021",
  ];

  it('should allow "Present" only for the first job', () => {
    // First job can have any date range
    const firstJobDate = getRandomDateRange(dateRanges, 0);
    expect(dateRanges).toContain(firstJobDate);

    // Subsequent jobs should never have "Present"
    for (let i = 1; i < 5; i++) {
      const date = getRandomDateRange(dateRanges, i);
      expect(date.endsWith("Present")).toBe(false);
    }
  });

  it("should always return a valid date range", () => {
    // Test multiple jobs
    for (let i = 0; i < 5; i++) {
      const date = getRandomDateRange(dateRanges, i);
      expect(date).toBeTruthy();
      expect(typeof date).toBe("string");
    }
  });
});

describe("Responsibilities Generation", () => {
  const responsibilities = [
    "Responsibility 1",
    "Responsibility 2",
    "Responsibility 3",
    "Responsibility 4",
    "Responsibility 5",
    "Responsibility 6",
  ];
  const usedSet = new Set<string>();

  it("should always generate exactly three responsibilities", () => {
    const result = generateResponsibilities(responsibilities, usedSet);
    expect(result).toHaveLength(3);
    result.forEach((resp) => {
      expect(resp).toBeTruthy();
      expect(typeof resp).toBe("string");
    });
  });

  it("should ensure all three responsibilities are unique", () => {
    const result = generateResponsibilities(responsibilities, usedSet);
    const uniqueResponses = new Set(result);
    expect(uniqueResponses.size).toBe(3); // Must have exactly 3 unique responses
  });

  it("should generate different sets of responsibilities on subsequent calls", () => {
    const firstSet = generateResponsibilities(responsibilities, usedSet);
    const secondSet = generateResponsibilities(responsibilities, usedSet);

    // Each set should have 3 unique items
    expect(new Set(firstSet).size).toBe(3);
    expect(new Set(secondSet).size).toBe(3);

    // The sets should be different
    const allResponses = new Set([...firstSet, ...secondSet]);
    expect(allResponses.size).toBeGreaterThan(3);
  });
});
