import { openDB } from 'idb';

// Checks to see if db exists and creates it if it doesn't
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Function related to interacting with db information
export const putDb = async (content) => {
    console.log('Adding new content to the database');

    const contactDb = await openDB('jate', 1);

    const tx = contactDb.transaction('jate', 'readwrite');

    const store = tx.objectStore('jate');

    const request = store.add({ content });

    const result = await request;
    console.log('New data has been successfully saved', result);
}

// Function related to viewing db information
export const getDb = async () => {
    console.log('Retrieving content from the database');

    const contactDb = await openDB('jate', 1);

    const tx = contactDb.transaction('jate', 'readonly');

    const store = tx.objectStore('jate');

    const request = store.getAll();

    const result = await request;
    console.log('Data has been retieved successfully', result);

};

initdb();
