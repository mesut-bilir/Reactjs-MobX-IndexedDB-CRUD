import React from "react";
import PropTypes from 'prop-types'

class Todo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li>
        {this.props.user.name} {` | `} {this.props.user.email}{` | `}{this.props.user.role}{` | `}{this.props.user.id}{` | `}
        <button onClick={() => this.props.delete(this.props.user.id)}>Remove</button>
      </li>
    )
  }
}

Todo.propTypes = {
  delete: PropTypes.func.isRequired
}

export default Todo