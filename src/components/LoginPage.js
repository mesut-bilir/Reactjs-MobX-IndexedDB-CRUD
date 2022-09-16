import React, { useState } from 'react'
import { Container, Row, Col, Input } from 'reactstrap'

import { Button, FormGroup, Form, Label, Alert } from "reactstrap";
import { Link } from 'react-router-dom';

//check props from inspect
function Login(props) {
    const [form, setValues] = useState({
        email: '',
        password: ''
    })

    const onChange = e => {
        setValues({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    
    return (
        <Container className="App">
            <Row>
                <Col>
                    <Form onSubmit={submitLogin}>
                        <div>
                            <h2>Login</h2>
                        </div>
                        <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                            <Label
                                className="me-sm-2"
                            >
                                Email
                            </Label>
                            <Input
                                onChange={onChange} value={form.email === null ? '' : form.email}
                                name="email"
                                placeholder="something@gmail.com"
                                type="email"
                            />
                        </FormGroup>
                        <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                            <Label
                                className="me-sm-2"
                            >
                                Password
                            </Label>
                            <Input
                                onChange={onChange} value={form.password === null ? '' : form.password}
                                name="password"
                                placeholder="don't tell!"
                                type="password"
                            />
                        </FormGroup>
                        <br />
                        <Button>
                            Login
                        </Button>
                        {' '}
                        <Link to="/">
                            <Button color="primary">
                                Forget Password
                            </Button>
                        </Link>

                    </Form>
                </Col>

            </Row>

        </Container>
    )
}

export default Login