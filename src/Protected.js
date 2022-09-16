import React from "react";
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { observer, inject } from "mobx-react";

export const Protected = Component => {

  return @inject("store")
  @observer
  class extends React.Component {
    render() {
      console.log(">>", this.props.store.authenticate);
      console.log(">>", this.props.store.rolum);
      return (
        <div>
          {this.props.store.authenticate &&(this.props.roles==this.props.store.rolum) ? (
            <Component {...this.props} />
          ) : (
            <Navigate to="/" replace true state={{ from: this.props.location }} />
          )}
        </div>
      );
    }
  };
};
