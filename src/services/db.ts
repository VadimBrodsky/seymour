import { openDb } from 'idb';

const DB_NAME = 'seymour';

const dbPromise = openDb(DB_NAME, 1, (upgradeDB) => {
  switch (upgradeDB.oldVersion) {
    case 0:
      upgradeDB.createObjectStore('channels', { autoIncrement: true });
      upgradeDB.createObjectStore('items', { autoIncrement: true });
  }
});

class Database {
  constructor(private store: string) {
    this.store = store;
  }

  // @ts-ignore
  public async set(data) {
    const db = await dbPromise;
    const tx = await db.transaction(this.store, 'readwrite');
    tx.objectStore(this.store).put(data);
    return tx.complete;
  }
}

export default {
  channels: new Database('channels'),
};
