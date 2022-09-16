import React from "react";
import { observer, inject } from "mobx-react";
import UserList from "./Components/UserList";
import AddUser from "./Components/AddUser";
import { Protected } from "./Protected";

@Protected
@inject("store")
@observer
class TodoList extends React.Component {
  newUserItem = (name, email, role) => {
    console.log(email + ` ` + role)
    this.props.store.addUser(name, email, role);
  }
  //

  removeUser = (id) => {
    console.log(id)
    this.props.store.removeUser(id);
  }

  render() {
    return (
      <div>
        <h4>Admin Dashboard</h4>
        <hr />
        <AddUser newUser={this.newUserItem} />
        <hr />

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Id</th>
              <th>**</th>
            </tr>
          </thead>
          <tbody>
            {this.props.store.users.map(user => (
              <UserList user={user} key={user.id} delete={this.removeUser} />
            ))}
          </tbody>
        </table>

        User Count: {this.props.store.userCount}
      </div>
    );
  }
}



export default TodoList;

