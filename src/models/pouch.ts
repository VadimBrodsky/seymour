import PouchDB from 'pouchdb-browser';

const db = new PouchDB('seymour');

db.info().then((info) => console.log(info));

export default 'hello from pouch';
