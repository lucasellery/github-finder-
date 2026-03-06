import type { SagaIterator } from "redux-saga";
import { all } from "redux-saga/effects";
import { githubSaga } from "./github/sagas";

export function* rootSaga(): SagaIterator {
  yield all([
    githubSaga(),
  ])
}
