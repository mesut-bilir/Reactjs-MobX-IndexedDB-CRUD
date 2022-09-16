import React from "react";
import PropTypes from 'prop-types'

class TodoUser extends React.Component {
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
          <button onClick={() => this.props.remove(this.props.user.id)}>Remove</button>
        </td>
      </tr>
    )
  }
}

TodoUser.propTypes = {
  add: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired
}

export default TodoUser