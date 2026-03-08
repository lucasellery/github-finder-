import { describe, it, expect } from 'vitest';
import githubReducer from "@/store/github/reducer";
import { GithubActionTypes, type GithubState } from "@/store/github/types";

const cleanState: GithubState = {
  user: null,
  repos: [],
  loading: false,
  error: null,
}

const mockUser = {
  login: "lucasellery",
  name: "Lucas Ellery",
  avatar_url: "https://avatars.githubusercontent.com/u/55142445?v=4",
  followers: 10,
  public_repos: 101,
}

const mockRepos = [
  {
    id: 1169428543,
    name: 'next-review',
    html_url: 'https://github.com/lucasellery/next-review',
    description: '',
    language: 'TypeScript',
    stargazers_count: 0,
    updated_at: '2026-02-28T17:14:00Z',
  }
];

describe('githubReducer', () => {
  it('should return the initial state', () => {
    // @ts-expect-error - We want to test the default state when no action is provided
    const state = githubReducer(undefined, { type: '@@INIT' });
    expect(state.loading).toBe(false);
    expect(state.user).toBeNull();
    expect(state.repos).toEqual([]);
  });

  it('should set loading to true and clear data on FETCH_USER_REQUEST', () => {
    const stateWithData: GithubState = {
      ...cleanState,
      user: mockUser,
      repos: mockRepos,
    };

    const state = githubReducer(stateWithData, {
      type: GithubActionTypes.FETCH_USER_REQUEST,
      payload: 'lucasellery',
    });

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.user).toBeNull();
    expect(state.repos).toEqual([]);
  });

  it('should save user and repos when response is SUCCESS', () => {
    const loadingState: GithubState = {
      ...cleanState, loading: true
    };

    const state = githubReducer(loadingState, {
      type: GithubActionTypes.FETCH_USER_SUCCESS,
      payload: { user: mockUser, repos: mockRepos },
    });

    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.user).toBe(mockUser);
    expect(state.repos).toBe(mockRepos);
  });

  it('should save the error when request FAILURE', () => {
    const loadingState: GithubState = {
      ...cleanState, loading: true
    };

    const state = githubReducer(loadingState, {
      type: GithubActionTypes.FETCH_USER_FAILURE,
      payload: 'Usuário não encontrado',
    });

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Usuário não encontrado');
    expect(state.user).toBeNull();
  });

  it('não deve mutar o estado anterior', () => {
    const frozen = Object.freeze(cleanState);

    expect(() =>
      githubReducer(frozen, {
        type: GithubActionTypes.FETCH_USER_REQUEST,
        payload: 'torvalds',
      })
    ).not.toThrow();
  });
});
