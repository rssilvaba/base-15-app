import { openDB } from 'idb';

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
    debugger
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
