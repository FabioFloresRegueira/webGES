import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  getToken(): string | null {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  setToken(token: string): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  clear(): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  }
}
