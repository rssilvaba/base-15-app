import { openDB } from 'idb';
const dbPromise = openDB('todo-store', 1, {
  upgrade(db) {
    const countryStore = db.createObjectStore('todos', {
      keyPath: 'id',
      autoIncrement: true,
    });
    countryStore.createIndex('Todo', 'Todo', { unique: true });
    // const userStore = db.createObjectStore('users', {keyPath: 'id', autoIncrement: true });
    // userStore.createIndex("UserIdCountryId", ['id', 'CountryId'], { unique: true })
    // userStore.createIndex("CountryId", ['CountryId'], { unique: false })
  },
});

export const TodosDB = {
  async getAll() {
    console.log('called TodosDB.getAll');
    return (await dbPromise).getAll('todos');
  },
  async get(key:any) {
    return (await dbPromise).get('todos', key);
  },
  async set(val:any) {
    return (await dbPromise).put('todos', val);
  },
  async delete(key:any) {
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
//   async get(key:any) {
//     return (await dbPromise).get('users', key);
//   },
//   async set(val) {
//     return (await dbPromise).put('users', val);
//   },
//   async delete(key:any) {
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
