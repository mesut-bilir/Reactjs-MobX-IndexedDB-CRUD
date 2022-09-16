import React from "react";
import PropTypes from 'prop-types'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (evt) => {
    console.log(evt.target.value)
    this.setState({ [evt.target.name]: evt.target.value });
  }
  handleSubmit = (event) => {
    this.setState({ email: "" })
    this.setState({ password: "" })
    this.props.Login(this.state.email, this.state.password)
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>

     
        {`  `}
        email:
        <input
          type="text"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        {`  `}
        password:
        <input
          type="text"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        {`  `}
        <button type="submit">Login</button>
      </form>
    )
  }
}

Login.propTypes = {
  Login: PropTypes.func.isRequired
}

export default Login