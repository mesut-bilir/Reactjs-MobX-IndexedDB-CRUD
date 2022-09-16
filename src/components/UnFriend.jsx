import React from "react";
import PropTypes from 'prop-types'

class UnFriend extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td>{this.props.user.name} </td>
        <td>{this.props.user.email}</td>
        <td>
          <button onClick={() => this.props.add(this.props.user.id)}>Add</button>
        </td>
      </tr>
    )
  }
}


UnFriend.propTypes = {
  add: PropTypes.func.isRequired
}

export default UnFriend