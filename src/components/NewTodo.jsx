import React from "react";
import PropTypes from 'prop-types'

class NewTodo extends React.Component {
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
    this.props.handleFormSubmit(this.state.name, this.state.email, this.state.role)
    this.setState({ name: "" })
    this.setState({ email: "" })
    this.setState({ role: "1" })
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>

        name:
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        {`  `}
        email:
        <input
          type="text"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        {`  `}
        role:

        <select value={this.state.role} name="role" onChange={this.handleChange}>
          <option value="1">User</option>
          <option value="2">Admin</option>
        </select>
        {`  `}
        <button type="submit">Create</button>
      </form>
    )
  }
}

NewTodo.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired
}

export default NewTodo