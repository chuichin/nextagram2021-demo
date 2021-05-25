import React, {useState} from 'react';
import axios from 'axios'
import {  toast } from 'react-toastify';
import { Button, Form, Input, FormGroup, Label, Row, Col } from 'reactstrap';


const LoginForm =({setLoggedIn}) => {

    const [loginDetails, setLoginDetails] = useState({
        username: "",
        password: ""
    })


    const handleChange = (e)=> {
        setLoginDetails(prevValue => {
            if (e.target.name === 'username'){
                return {
                    username: e.target.value,
                    password: prevValue.password
                }
            } else if (e.target.name === 'password'){
                return {
                    username: prevValue.username,
                    password: e.target.value
                }
            }
        })
    }

    const onSubmitForm = (e) => {
        e.preventDefault()

        axios({
            method: 'POST',
            url: 'https://nextagram-api.herokuapp.com/api/v1/users/login',
            data: loginDetails
          })
          .then(response => {
            localStorage.setItem('jwt', response.data.auth_token)
            setLoggedIn(localStorage.getItem('jwt') !== null)
            toast.success('🦄 Login successful!', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
          })

          .catch(error => {
            console.error(error.response) // so that we know what went wrong if the request failed
            toast.error('Oh No!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        })
    }

    const disabledButton = loginDetails.username.length === 0 || loginDetails.password.length === 0


    return (
        <div>
            <Row>
                <h3>Login</h3>
                <Form onSubmit={onSubmitForm} >
                    <FormGroup>
                        <Col lg={{size:4, offset: 4}}>
                            <Label>Username</Label>
                            <Input name="username" type="text" onChange={handleChange} ></Input>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col lg={{size:4, offset: 4}}>
                            <Label>Password</Label>
                            <Input name="password" type="password" onChange={handleChange} ></Input>
                        </Col>
                    </FormGroup>
                    
                    <Col lg={{size:4, offset: 4}} className="login-button">
                        <Button color = "primary" disabled = {disabledButton} type = 'submit'>Login</Button>
                    </Col>
                </Form>
            </Row>
        </div>

    )
}

export default LoginForm;