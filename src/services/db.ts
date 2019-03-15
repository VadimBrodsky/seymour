import { openDb } from 'idb';

const DB_NAME = 'seymour';
const READ_WRITE = 'readwrite';

const dbPromise = openDb(DB_NAME, 1, (upgradeDB) => {
  switch (upgradeDB.oldVersion) {
    case 0:
      upgradeDB.createObjectStore('channels', { autoIncrement: true });
      upgradeDB.createObjectStore('items', { autoIncrement: true });
  }
}).catch((e) => {
  console.log(e);
});

class Database {
  constructor(private store: string) {
    this.store = store;
  }

  public async set(data: { [key: string]: unknown }) {
    const db = await dbPromise;

    if (!db) {
      return Promise.reject();
    }

    const tx = db.transaction(this.store, READ_WRITE);
    const id = await tx.objectStore(this.store).add(data);

    return tx.complete.then(() => id);
  }
}

export default {
  channels: new Database('channels'),
  items: new Database('items'),
};
