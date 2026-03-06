import { loadFromStorage, saveToStorage } from "@/helpers/localStorage";
import {
  GithubActionTypes,
  type GithubActions,
  type GithubState,
} from "./types";

const persistedData = loadFromStorage();

const initialState: GithubState = {
  user: persistedData?.user || null,
  repos: persistedData?.repos || [],
  loading: false,
  error: null,
};

const githubReducer = (
  state = initialState,
  action: GithubActions,
): GithubState => {
  switch (action.type) {
    case GithubActionTypes.FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        user: null,
        repos: [],
      };

    case GithubActionTypes.FETCH_USER_SUCCESS: {
      const nextState = {
        ...state,
        loading: false,
        user: action.payload.user,
        repos: action.payload.repos,
      };

      saveToStorage({
        user: nextState.user,
        repos: nextState.repos,
      });

      return nextState;
    }

    case GithubActionTypes.FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GithubActionTypes.CLEAR_USER:
      return {
        ...state,
        user: null,
        repos: [],
        error: null,
      };

    default:
      return state;
  }
};

export default githubReducer;
