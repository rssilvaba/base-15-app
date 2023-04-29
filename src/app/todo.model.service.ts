import { Injectable } from '@angular/core';
import { openDB } from 'idb';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { todoT } from './ngrx';

const dbPromise = openDB('todo-store', 1, {
  upgrade(db) {
    const todoStore = db.createObjectStore('todos', {
      keyPath: 'id',
      autoIncrement: true,
    });
    todoStore.createIndex('Todo', 'Todo', { unique: true });
  },
});

export const TodosDB = {
  async getAll() {
    return (await dbPromise).getAll('todos');
  },
  async get(key: number) {
    return (await dbPromise).get('todos', key);
  },
  async set(val: unknown) {
    return (await dbPromise).put('todos', val);
  },
  async delete(key: string) {
    return (await dbPromise).delete('todos', key);
  },
  async clear() {
    return (await dbPromise).clear('todos');
  },
  async keys() {
    return (await dbPromise).getAllKeys('todos');
  },
  async count() {
    return (await dbPromise).count('todos');
  },
};

// export const usersDB = {
//   async getAll() {
//     return (await dbPromise).getAll('users');
//   },
//   async get(key) {
//     return (await dbPromise).get('users', key);
//   },
//   async set(val) {
//     return (await dbPromise).put('users', val);
//   },
//   async delete(key) {
//     return (await dbPromise).delete('users', key);
//   },
//   async clear() {
//     return (await dbPromise).clear('users');
//   },
//   async keys() {
//     return (await dbPromise).getAllKeys('users');
//   },
//   async count() {
//     return (await dbPromise).count('users');
//   },
//   async countByCountry(countryId) {
//     const range = IDBKeyRange.bound([countryId], [countryId], false, false);
//     return (await dbPromise).countFromIndex('users', 'CountryId', range);
//   },
//   async getAllByCountry(countryId) {
//     const range = IDBKeyRange.bound([countryId], [countryId], false, false);
//     return (await dbPromise).getAllFromIndex('users', 'CountryId', range);
//   },
// };

@Injectable({ providedIn: 'root' })
export class TodoService {
  private todos$ = new BehaviorSubject<todoT[] | undefined>(undefined);
  public init(): void {
    TodosDB.getAll().then((d) => this.todos$.next(d));
  }

  public upsert(todo: todoT) {
    debugger
    return TodosDB.set(todo).then(() => TodosDB.getAll().then((d) => this.todos$.next(d)));
  }

  public delete(key: string) {
    return TodosDB.delete(key).then(() => TodosDB.getAll().then((d) => this.todos$.next(d)));
  }

  constructor() {
    this.init();
  }

  public getTodos(): Observable<any> {
    return this.todos$;
  }

  public get(id: string | null) {
    return this.todos$.pipe(map((arr) => arr?.find((x) => (id ? x.id === parseInt(id, 10) : false))));
  }
}
