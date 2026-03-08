import { describe, it, expect } from "vitest";
import {
  selectUser,
  selectRepos,
  selectLoading,
  selectError,
} from "@/store/github/selectors";
import type { RootState } from "@/store/rootReducer";

const mockState: RootState = {
  github: {
    user: {
      login: "lucasellery",
      name: "Lucas Ellery",
      avatar_url: "https://avatars.githubusercontent.com/u/55142445?v=4",
      followers: 10,
      public_repos: 101,
    },
    repos: [
      {
        id: 1169428543,
        name: "next-review",
        html_url: "https://github.com/lucasellery/next-review",
        description: "",
        language: "TypeScript",
        stargazers_count: 0,
        updated_at: "2026-02-28T17:14:00Z",
      },
    ],
    loading: false,
    error: null,
  },
};

describe("selectors", () => {
  it("should return the user", () => {
    expect(selectUser(mockState)).toEqual(mockState.github.user);
  });

  it("should return the repositories", () => {
    expect(selectRepos(mockState)).toHaveLength(1);
    expect(selectRepos(mockState)[0].name).toBe("next-review");
  });

  it("selectLoading should return false", () => {
    expect(selectLoading(mockState)).toBe(false);
  });

  it("selectLoading should return true when loading", () => {
    const loadingState = {
      ...mockState,
      github: { ...mockState.github, loading: true },
    };
    expect(selectLoading(loadingState)).toBe(true);
  });

  it("selectError should return null when there is no error", () => {
    expect(selectError(mockState)).toBeNull();
  });

  it("selectError should should return the error message", () => {
    const errorState = {
      ...mockState,
      github: { ...mockState.github, error: "Usuário não encontrado." },
    };
    expect(selectError(errorState)).toBe("Usuário não encontrado.");
  });
});
