import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("склеивает только истинные классы", () => {
    expect(cn("a", false, "b", null, undefined)).toBe("a b");
  });

  it("разрешает конфликты tailwind-классов в пользу последнего", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });
});
