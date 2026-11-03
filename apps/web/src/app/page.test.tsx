import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Главная страница", () => {
  it("показывает заголовок и кнопку", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: "Hackathon" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Начать" })).toBeInTheDocument();
  });
});
