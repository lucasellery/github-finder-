import type { GithubState } from "@/store/github/types";

const STORAGE_KEY = 'github-finder:last-search';

export const saveToStorage = (state: Pick<GithubState, 'user' | 'repos'>): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Erro ao salvar no localStorage:', error);
  }
}

export const loadFromStorage = (): Pick<GithubState, 'user' | 'repos'> | null => {
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Erro ao carregar do localStorage:', error);
    return null;
  }
}
