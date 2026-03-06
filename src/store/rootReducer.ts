import githubReducer from "./github/reducer";
import { combineReducers } from "redux";
import type { GithubState } from "./github/types";

const rootReducer = combineReducers({
  github: githubReducer,
});

export type RootState = typeof rootReducer extends (
  ...args: unknown[]
) => infer R
  ? R
  : GithubState;

export default rootReducer;
