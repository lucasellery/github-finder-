import type { FetchUserFailureAction, FetchUserRequestAction, FetchUserSuccessAction, GithubRepo, GithubUser } from "./types";
import { GithubActionTypes } from "./types";

export const fetchUserRequest = (username: string): FetchUserRequestAction => ({
  type: GithubActionTypes.FETCH_USER_REQUEST,
  payload: username,
});

export const fetchUserSuccess = (user: GithubUser, repos: GithubRepo[]): FetchUserSuccessAction => ({
  type: GithubActionTypes.FETCH_USER_SUCCESS,
  payload: { user, repos },
});

export const fetchUserFailure = (error: string): FetchUserFailureAction => ({
  type: GithubActionTypes.FETCH_USER_FAILURE,
  payload: error,
});

export const clearUser = () => ({
  type: GithubActionTypes.CLEAR_USER,
});