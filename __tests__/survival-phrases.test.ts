import { describe, it, expect } from "vitest";
import {
  getRandomPhrase,
  getRandomPhrases,
} from "../app/data/survival-phrases";
import { survivalPhrases } from "../app/data/survival-phrases";

describe("Survival Phrases", () => {
  describe("getRandomPhrase", () => {
    it("returns a valid phrase for each industry and category", () => {
      const industries = ["tech", "service", "healthcare"] as const;
      const categories = ["objective", "experience", "skills"] as const;

      industries.forEach((industry) => {
        categories.forEach((category) => {
          const phrase = getRandomPhrase(industry, category);
          // Verify the phrase exists in our data
          expect(survivalPhrases[industry][category]).toContain(phrase);
        });
      });
    });

    it("throws error for invalid industry", () => {
      expect(() => getRandomPhrase("invalid" as any, "objective")).toThrow();
    });

    it("throws error for invalid category", () => {
      expect(() => getRandomPhrase("tech", "invalid" as any)).toThrow();
    });
  });

  describe("getRandomPhrases", () => {
    it("returns requested number of unique phrases", () => {
      const phrases = getRandomPhrases("tech", "skills", 3);
      expect(phrases.length).toBe(3);
      // Verify all phrases are unique
      expect(new Set(phrases).size).toBe(3);
      // Verify all phrases exist in our data
      phrases.forEach((phrase) => {
        expect(survivalPhrases.tech.skills).toContain(phrase);
      });
    });

    it("returns all available phrases if count exceeds available phrases", () => {
      const allPhrases = survivalPhrases.tech.skills;
      const phrases = getRandomPhrases("tech", "skills", allPhrases.length + 5);
      expect(phrases.length).toBe(allPhrases.length);
      // Verify all phrases are unique
      expect(new Set(phrases).size).toBe(allPhrases.length);
    });

    it("throws error for invalid industry", () => {
      expect(() =>
        getRandomPhrases("invalid" as any, "objective", 1),
      ).toThrow();
    });

    it("throws error for invalid category", () => {
      expect(() => getRandomPhrases("tech", "invalid" as any, 1)).toThrow();
    });
  });
});
