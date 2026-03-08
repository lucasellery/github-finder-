import { describe, it, expect } from 'vitest';
import {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
} from '@/store/github/actions';
import { GithubActionTypes } from '@/store/github/types';

const mockUser = {
  login: 'torvalds',
  name: 'Linus Torvalds',
  avatar_url: 'https://github.com/torvalds.png',
  followers: 230000,
  public_repos: 10,
};

const mockRepos = [
  {
    id: 1,
    name: 'linux',
    html_url: 'https://github.com/torvalds/linux',
    description: 'Linux kernel',
    language: 'C',
    stargazers_count: 180000,
    updated_at: '2024-01-01T00:00:00Z',
  },
];

describe('action creators', () => {
  it('fetchUserRequest deve criar a action correta', () => {
    const action = fetchUserRequest('torvalds');

    expect(action.type).toBe(GithubActionTypes.FETCH_USER_REQUEST);
    expect(action.payload).toBe('torvalds');
  });

  it('fetchUserSuccess deve criar a action correta', () => {
    const action = fetchUserSuccess(mockUser, mockRepos);

    expect(action.type).toBe(GithubActionTypes.FETCH_USER_SUCCESS);
    expect(action.payload.user).toEqual(mockUser);
    expect(action.payload.repos).toEqual(mockRepos);
  });

  it('fetchUserFailure deve criar a action correta', () => {
    const action = fetchUserFailure('Usuário não encontrado.');

    expect(action.type).toBe(GithubActionTypes.FETCH_USER_FAILURE);
    expect(action.payload).toBe('Usuário não encontrado.');
  });
});