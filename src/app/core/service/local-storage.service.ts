import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getItems(key: string): unknown | undefined {
    const items = window.localStorage.getItem(key);
    return items !== null
      ? JSON.parse(items) as unknown
      : undefined
  }

  setItem(key: string, item: unknown): void {
    window.localStorage.setItem(key, JSON.stringify(item));
  }

  clearItem(): void {
    window.localStorage.clear();
  }
}
