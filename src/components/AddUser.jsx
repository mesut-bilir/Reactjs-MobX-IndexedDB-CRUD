import React from "react";
import PropTypes from 'prop-types'

class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      role: '1'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (evt) => {
    console.log(evt.target.value)
    this.setState({ [evt.target.name]: evt.target.value });
  }
  handleSubmit = (event) => {
    this.props.newUser(this.state.name, this.state.email, this.state.role)
    this.setState({ name: "" })
    this.setState({ email: "" })
    this.setState({ role: "1" })
    event.preventDefault()
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this.handleSubmit}>

        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </div>
     
        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            name="email"
            className="form-control"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <label>Role:</label>
          <select value={this.state.role} name="role" onChange={this.handleChange} className="form-control">
            <option value="1">User</option>
            <option value="2">Admin</option>
          </select>
        </div>

        <button className="btn btn-success" type="submit">Create</button>
      </form>
    )
  }
}

AddUser.propTypes = {
  newUser: PropTypes.func.isRequired
}

export default AddUser