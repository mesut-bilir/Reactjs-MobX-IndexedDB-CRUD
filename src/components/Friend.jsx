import React from "react";
import PropTypes from 'prop-types'

class Friend extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td>{this.props.user.name} </td>
        <td>{this.props.user.email}</td>
        <td>
          <button onClick={() => this.props.remove(this.props.user.id)}>Remove</button>
        </td>
      </tr>
    )
  }
}

Friend.propTypes = {
  remove: PropTypes.func.isRequired
}

export default Friend