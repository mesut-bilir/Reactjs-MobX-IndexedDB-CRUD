import Dexie from 'dexie';
import 'dexie-observable';

export default class dexieStore {
  constructor() {
    console.log('dexieStore.constructor')
    this.db = new Dexie('TodoDB-mesut');
    this.init()
    this.updateCallback = () => console.log('no update callback defined')
    this.createCallback = () => console.log('no create callback defined')
    this.deleteCallback = () => console.log('no delete callback defined')
  }

  setUpdateCallback(func) {
    this.createCallback = func
  }

  setCreateCallback(func) {
    this.updateCallback = func
  }

  setDeleteCallback(func) {
    this.deleteCallback = func
  }

  init() {
    const self = this
    console.log('dexie.init')

    this.db.version(1).stores({ users: '++id' });
    this.db.version(2).stores({ partners: '++id' });
    this.db.on('changes', function (changes) {
      changes.forEach(function (change) {
        console.log('change.type ' + change.type)

        switch (change.type) {
          case 1: // CREATED
            console.log('An object was created: ' + JSON.stringify(change.obj));
            self.createCallback()
            break;
          case 2: // UPDATED
            console.log('An object with key ' + change.key + ' was updated with modifications: ' + JSON.stringify(change.mods));
            self.updateCallback()
            break;
          case 3: // DELETED
            console.log('An object was deleted: ' + JSON.stringify(change.oldObj));
            self.deleteCallback()
            break;
        }
      });
    });
  }

  getTable = (tableName) => {
    console.log('dexieStore.getTable')
    return this.db.table(tableName).toArray()
  }
  // localStorage.setItem('user', JSON.stringify(user));
  // const user = JSON.parse(localStorage.getItem('user'));
  //localStorage.removeItem("user");
  //user login
  Login = (tableName, item) => {
    const idb = this.db
    idb.table(tableName).filter(function (el) {
      return el.email == item.email && el.password == item.password;
    }).toArray().then(response => {
      if (response.length > 0) {
        response[0].password = ``;
        localStorage.setItem('user', JSON.stringify(response[0]));
      }
      else {
        alert(`User not found`)
      }
    });
  }
  //
  //add user partner 
  addPartner = (tableName, item) => {
    const idb = this.db
    idb.table(tableName).filter(function (el) {
      return el.partnerId == item.partnerId && el.userId == item.userId;
    }).toArray().then(response => {
      if (response.length < 1) {
        idb.table(tableName).add(item)
        console.log('add parner')
      }
    });
  }
  // remove  partner by user name and parner name 
  removePartner = (tableName, item) => {
    const idb = this.db
    idb.table(tableName).filter(function (el) {
      return el.partnerId == item.partnerId && el.userId == item.userId;
    }).toArray().then(response => {
      if (response.length > 0) {
        idb.table(tableName).delete(response[0].id)
        console.log('remove parner')
      }
    });
  }


  //
  remove = (tableName, item) => {
    const idb = this.db
    console.log('hat3: ', item)
    return idb.table(tableName).delete(item)
      .then(function (id) {
        return idb.table(tableName).get(id)
      })
      .then(function (newItem) {
        return newItem
      })
      .catch(function (err) {
        alert("Error: " + (err.stack || err))
      })
  }
  insertIntoTable = (tableName, item) => {
    const idb = this.db
    return idb.table(tableName).add(item)
      .then(function (id) {
        return idb.table(tableName).get(id)
      })
      .then(function (newItem) {
        return newItem
      })
      .catch(function (err) {
        alert("Error: " + (err.stack || err))
      })
  }

}