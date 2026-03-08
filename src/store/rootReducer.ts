import githubReducer from "./github/reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  github: githubReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
