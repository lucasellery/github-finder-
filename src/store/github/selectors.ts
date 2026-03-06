import type { RootState } from "../rootReducer";

export const selectUser = (state: RootState) => state.github.user;
export const selectRepos = (state: RootState) => state.github.repos;
export const selectLoading = (state: RootState) => state.github.loading;
export const selectError = (state: RootState) => state.github.error;
