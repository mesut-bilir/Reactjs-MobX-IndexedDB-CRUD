import React from "react";
import PropTypes from 'prop-types'

class UserList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.user.name} </td>
                <td>{this.props.user.email}</td>
                <td>{this.props.user.role==1?`User`:`Admin`}</td>
                <td>{this.props.user.id}</td>
                <td>
                    <button className="btn btn-danger" onClick={() => this.props.delete(this.props.user.id)}>Remove</button>
                </td>
            </tr>
        )
    }
}

UserList.propTypes = {
    delete: PropTypes.func.isRequired
}

export default UserList