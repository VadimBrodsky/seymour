import { openDb } from 'idb';

const DB_NAME = 'seymour';
const READ_WRITE = 'readwrite';

const dbPromise = openDb(DB_NAME, 1, (upgradeDB) => {
  switch (upgradeDB.oldVersion) {
    case 0:
      const channelStore = upgradeDB.createObjectStore('channels', {
        autoIncrement: true,
      });
      const itemsStore = upgradeDB.createObjectStore('items', { autoIncrement: true });

      itemsStore.createIndex('channel', 'channelId', { unique: false });
  }
}).catch((e) => {
  console.log(e);
});

export default class Database {
  constructor(private store: string) {
    this.store = store;
  }

  public async create(data: { [key: string]: unknown }) {
    const db = await dbPromise;

    if (!db) {
      return Promise.reject();
    }

    const tx = db.transaction(this.store, READ_WRITE);
    const id = await tx.objectStore(this.store).add(data);

    return tx.complete.then(() => id);
  }

  public async read(key: IDBValidKey) {
    const db = await dbPromise;

    if (!db) {
      return Promise.reject();
    }

    return db
      .transaction(this.store)
      .objectStore(this.store)
      .get(key);
  }

  public async update(key: IDBValidKey, data: {}) {
    const oldRecord = await this.read(key);
    const newRecord = { ...oldRecord, ...data };

    const db = await dbPromise;

    if (!db) {
      return Promise.reject();
    }

    const tx = db.transaction(this.store, READ_WRITE);
    const id = await tx.objectStore(this.store).put(newRecord, key);

    return tx.complete.then(() => newRecord);
  }

  public async delete(key: IDBValidKey) {
    const db = await dbPromise;

    if (!db) {
      return Promise.reject();
    }

    const tx = db.transaction(this.store, READ_WRITE);
    tx.objectStore(this.store).delete(key);
    return tx.complete;
  }

  public async getAllByIndex(indexName: string, key: IDBKeyRange) {
    const db = await dbPromise;

    if (!db) {
      return Promise.reject();
    }

    const tx = db.transaction(this.store);
    return tx
      .objectStore(this.store)
      .index(indexName)
      .getAll(key);
  }
}
