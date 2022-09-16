import React from 'react'
import { useNavigate } from "react-router-dom";

import PersistentObservableTodoStore from './store/persistentObservableStore';
import dexieStore from "./store/dexieStore";

import { useForm } from "react-hook-form";
import { Observer } from "mobx-react"


function Login(props) {
  const { register, handleSubmit } = useForm();
  const store = new PersistentObservableTodoStore(new dexieStore())

  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (data.email == '' || data.password == '') {
      alert("Please complete form")
    }
    else {
      props.Login(data)
      const user = JSON.parse(localStorage.getItem('user'));
      if (user.role == 1) {
        navigate("/user");
      }
      if (user.role == 2) {
        navigate("/admin");
      }
    }
  }

  return (
    <Observer>
      {() => {
        console.log(props)
        return (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <h2>Login</h2>
            </div>
            <div className="form-group">
              <input {...register("email")} placeholder="email" />

            </div>
            <div className="form-group">
              <input {...register("password")} placeholder="password" />
            </div>

            <input type="submit" />
          </form>
        )
      }}
    </Observer>
  );
}

export default Login



