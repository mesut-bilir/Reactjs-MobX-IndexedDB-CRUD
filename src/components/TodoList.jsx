import React from "react";
import { observer, inject } from "mobx-react";
import Todo from "./Todo";
import TodoUser from "./TodoUser";
import Login from "./Login";
import NewTodo from "./NewTodo";

@inject("store")
@observer
class TodoList extends React.Component {
  newUserItem = (name, email, role) => {
    console.log(email + ` ` + role)
    this.props.store.addUser(name, email, role);
  }
  //
  Login = (email, password) => {
    console.log(email + ` ` + password)
    this.props.store.Login(email, password);
  }
  removeUser = (id) => {
    console.log(id)
    this.props.store.removeUser(id);
  }
  removePart = (partnerId) => {
    console.log('hat: ', partnerId)
    this.props.store.removePart(partnerId);
  }
  addPart = (id) => {
    console.log('hat: ', id)
    var user = 11;
    this.props.store.addPart(user, id);
  }


  render() {
    return (
      <div>
        <NewTodo handleFormSubmit={this.newUserItem} />
        <hr />
        <ul>
          {this.props.store.users.map(user => (
            <Todo user={user} key={user.id} delete={this.removeUser} />
          ))}
        </ul>
        User Count: {this.props.store.userCount}
        <hr />
        <ul>
          {this.props.store.users.map(user => (
            <TodoUser user={user} key={user.id} add={this.addPart} remove={this.removePart} />
          ))}
        </ul>
        Partner Count: {this.props.store.userCount}
        <hr />
        Login Page
        <hr/>
        <Login Login={this.Login} />
      </div>
    );
  }
}



export default TodoList;