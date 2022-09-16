import React from "react";
import { render } from "react-dom";

import PersistentObservableTodoStore from './store/persistentObservableStore';
import dexieStore from "./store/dexieStore";
const pstore = new PersistentObservableTodoStore(new dexieStore())

import { Provider } from "mobx-react";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./User";
import Admin from "./Admin";
import Login from "./Login";
import TodoList from "./Components/TodoList";


class App extends React.Component {

  logout = async () => {
    pstore.authenticate = false;
    var nuser = { name: '', email: '', role: '0', password: '', finished: false }
    localStorage.setItem('user', JSON.stringify(nuser));
  }
  login = async (data) => {
    pstore.Login(data.email, data.password)
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      pstore.authenticate = true;
    }
  }
  render() {
    return (
      <div className="container">

        <BrowserRouter>
          <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <li>
                <Link to="/">Login</Link>
              </li>

              <li>
                <Link to="/user">User</Link>
              </li>
              <li>
                <Link to="/admin">Admin</Link>
              </li>
              <li>
                <Link to="/list">TodoList</Link>
              </li>
              <li>
                <button className="btn btn-danger" onClick={this.logout}>logout</button>
              </li>
            </nav>
            <Routes>
              <Route index spath="/" element={<Login Login={this.login} />} />

              <Route path="user" element={<User roles='1' />} />
              <Route path="admin" element={<Admin roles='2' />} />
              <Route path="list" element={<TodoList />} />
              <Route path="login" element={<Login />} />

            </Routes>

          </div>
        </BrowserRouter>
      </div>


    );
  }
}




render(
  <Provider store={pstore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
