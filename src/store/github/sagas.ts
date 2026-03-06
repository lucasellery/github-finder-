import axios from 'axios';
import type { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { GithubActionTypes, type FetchUserRequestAction, type GithubRepo, type GithubUser } from './types';
import { fetchUserFailure, fetchUserSuccess } from './actions';

const BASE_URL = 'https://api.github.com';

const fetchUserFromApi = (username: string) => {
  return axios.get<GithubUser>(`${BASE_URL}/users/${username}`);
}

const fetchUserReposFromApi = (username: string) => {
  return axios.get<GithubRepo[]>(
    `${BASE_URL}/users/${username}/repos?per_page=100&sort=updated`
  )
}

// Worker saga
function* fetchUserWorker(action: FetchUserRequestAction): SagaIterator {
  try {
    const username = action.payload;

    const userResponse = yield call(fetchUserFromApi, username);
    const reposReponse = yield call(fetchUserReposFromApi, username);

    // se tudo certo, cai aqui: 
    yield put(
      fetchUserSuccess(userResponse.data, reposReponse.data)
    )

  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      yield put(fetchUserFailure("Usuário não encontrado."));
    } else {
      yield put(fetchUserFailure("Erro ao buscar dados. Tente novamente."))
    }
  }
}

export function* githubSaga(): SagaIterator {
  // sempre que chamar FETCH_USER_REQUEST, chama o worker
  // takeLatest cancela a busca (saga) anterior se o user digitar rápido 
  yield takeLatest(GithubActionTypes.FETCH_USER_REQUEST, fetchUserWorker);
}
