import { GithubActionTypes, type GithubActions, type GithubState } from "./types";

const initialState: GithubState = {
  user: null,
  repos: [],
  loading: false,
  error: null,
}

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
        repos: []
      };
    
    case GithubActionTypes.FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        repos: action.payload.repos,
      }

    case GithubActionTypes.FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case GithubActionTypes.CLEAR_USER:
      return {
        ...state,
        user: null,
        repos: [],
        error: null,
      }

    default:
      return state;
  }
}

export default githubReducer;