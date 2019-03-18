import { openDb, UpgradeDB } from 'idb';
import { DB_NAME, DB_VERSION } from './config';

const READ_WRITE = 'readwrite';
const dbPromise = openDb(DB_NAME, DB_VERSION, migrateDb).catch((e) => {
  console.warn(e);
});

function migrateDb(upgradeDB: UpgradeDB) {
  switch (upgradeDB.oldVersion) {
    case 0:
      const channelStore = upgradeDB.createObjectStore('channels', {
        autoIncrement: true,
      });

      const itemsStore = upgradeDB.createObjectStore('items', { autoIncrement: true });
      itemsStore.createIndex('channel', 'channelId', { unique: false });
  }
}

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

  public async getAll() {
    const db = await dbPromise;

    if (!db) {
      return Promise.reject();
    }

    const tx = db.transaction(this.store);
    const keys = tx.objectStore(this.store).getAllKeys();
    const data = tx.objectStore(this.store).getAll();
    // @ts-ignore
    return Promise.all([keys, data]).then(
      // @ts-ignore
      // FIXME: this only works because there is only 1 channel
      // TODO: use own id instead of idb autoIncrement one
      ([[key], [data]]) => {
        return { [key]: data }
      } ,
    );
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
