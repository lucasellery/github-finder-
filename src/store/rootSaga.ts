import { all } from "redux-saga/effects";
import { githubSaga } from "./github/sagas";

export function* rootSaga(): Generator {
  yield all([
    githubSaga(),
  ])
}
