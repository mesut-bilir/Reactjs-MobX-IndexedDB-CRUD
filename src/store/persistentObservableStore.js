import { observable, computed, action } from "mobx";
import TodoModel from "../models/TodoModel";
import { task } from 'mobx-task'

export default class PersistentObservableTodoStore {
  @observable users = []
  @observable partners = []
  @observable authenticate = false;
  @observable user = {};

  constructor(store) {
    this.persistentStore = store
    this.fetchUsers()
    this.fetchPartners()
    this.persistentStore.setDeleteCallback(() => this.handleStoreDelete())
    this.persistentStore.setCreateCallback(() => this.handleStoreNewItem())

  }

  handleStoreNewItem() {
    console.log('new item detected!')
    this.fetchUsers()
    this.fetchPartners()
  }

  handleStoreDelete() {
    console.log('delete detected!')
    this.fetchUsers()
    this.fetchPartners()
  }


  @task async fetchUsers() {
    console.log(this.persistentStore)
    await this.persistentStore.getTable('users')
      .then(action(users => this.users.replace(users)))
  }
  @task async fetchPartners() {
    console.log(this.persistentStore)
    await this.persistentStore.getTable('partners')
      .then(action(partners => this.partners.replace(partners)))
  }

  @action
  async Login(email, password) {
    console.log('hat2: ' + email + ` ` + password)
    await this.persistentStore.Login('users', { 'email': email, 'password': password })
  }
  //


  @action
  async addPart(partnerId) {
    let userId = JSON.parse(localStorage.getItem('user')).id;
    const newPartner = await this.persistentStore.addPartner('partners', { 'userId': userId, 'partnerId': partnerId })
    //test et
    this.partners.push({ 'userId': userId, 'partnerId': partnerId });
  }


  @action
  async removePart(partnerId) {
    let userId = JSON.parse(localStorage.getItem('user')).id;
    const newUser = await this.persistentStore.removePartner('partners', { 'userId': userId, 'partnerId': partnerId })
    this.users.filter(i => i.userId !== userId && i.partnerId !== partnerId)
  }

  //
  @computed
  get getPartner() {
    let userId = JSON.parse(localStorage.getItem('user')).id;
    let partner = this.partners.filter(i => i.userId == userId);
    let userList = this.users.filter(user => user.id != userId);

    const newArr = [];
    for (let i = 0; i < userList.length; i++) {
      for (let j = 0; j < partner.length; j++) {
        if (userList[i].id == partner[j].partnerId) {
          newArr.push(userList[i])
        }
      }
    };
    console.log(newArr)

    let uniqueObjArray = [...new Map(newArr.map((item) => [item["id"], item])).values(),];   
    return uniqueObjArray;
  }



  @computed
  get userCount() {
    return this.users.length;
  }
  @computed
  get rolum() {
    return JSON.parse(localStorage.getItem('user')).role;
  }

  @action
  async addUser(name, email, role) {
    const newUser = await this.persistentStore.insertIntoTable('users', new TodoModel(name, email, role))
    console.log('newUser: ', newUser)
    this.users.push(newUser);
  }

  @action
  async removeUser(id) {
    console.log('hat: ', id)
    const newUser = await this.persistentStore.remove('users', id)
    console.log('newUser: ', newUser)
    this.users.filter(i => i.id !== id)
  }
}