import PouchDB from 'pouchdb-browser';

PouchDB.debug.enable('*');

const db = new PouchDB('seymour');

db.info().then((info) => console.log(info));

export default 'hello from pouch';
