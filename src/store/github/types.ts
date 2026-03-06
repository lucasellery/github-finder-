// --- API Response Types ---
export type GithubUser = {
  login: string;
  name: string;
  avatar_url: string;
  followers: number;
  public_repos: number;
}

export type GithubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string;
  language: string;
  stargazers_count: number;
  updated_at: string;
}

// -- Redux States ---
export type GithubState = {
  user: GithubUser | null;
  repos: GithubRepo[]; // successfully fetched repos
  loading: boolean;
  error: string | null;
}

// --- Action Types ---
export enum GithubActionTypes {
  FETCH_USER_REQUEST = '@github/FETCH_USER_REQUEST',
  FETCH_USER_SUCCESS = '@github/FETCH_USER_SUCCESS',
  FETCH_USER_FAILURE = '@github/FETCH_USER_FAILURE',
  CLEAR_USER = '@github/CLEAR_USER',
}

// Action types for UI with username
export interface FetchUserRequestAction {
  type: GithubActionTypes.FETCH_USER_REQUEST;
  payload: string;
}

export interface FetchUserSuccessAction {
  type: GithubActionTypes.FETCH_USER_SUCCESS;
  payload: {
    user: GithubUser;
    repos: GithubRepo[];
  };
}

export interface FetchUserFailureAction {
  type: GithubActionTypes.FETCH_USER_FAILURE;
  payload: string;
}

export interface ClearUserAction {
  type: GithubActionTypes.CLEAR_USER;
}

export type GithubActions =
  | FetchUserRequestAction
  | FetchUserSuccessAction
  | FetchUserFailureAction
  | ClearUserAction;

// https://api.github.com/users/{username}
// https://api.github.com/users/{username}/repos/per_page=100&sort=updated