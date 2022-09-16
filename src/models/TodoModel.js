import { observable } from "mobx";

export default class TodoModel {
  @observable name;
  @observable email;
  @observable role;
  @observable password;
  @observable finished;

  constructor(name, email, role) {
    this.name = name;
    this.email = email;
    this.role = role;
    this.password = '1';
    this.finished = false
  }
}