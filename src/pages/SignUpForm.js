import React, {useState} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import { Button, Form, FormFeedback, Input, FormGroup, Label, Row, Col } from 'reactstrap';

function SignUpForm({setLoggedIn}){

    const [userDetails, setUserDetails] = useState({
        username: "",
        email: "",
        password: ""
    })

    const [usernameValid, setUsernameValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false)
    const [emailFormat, setEmailFormat] = useState(false)
    const [passwordValid, setPasswordValid] = useState(false)

    const handleChange = (e)=> {
        if (e.target.name === "username"){
            setTimeout(() => {
                checkUsername(e.target.value);
            }, 300);

            setUserDetails(prevValue=> {
                return {
                    username: e.target.value,
                    email: prevValue.email,
                    password: prevValue.password
                }
            })
        } else if (e.target.name === "email"){
            setTimeout(() => {
                const pattern = /\w+@\w+\.\w+/;
                if (pattern.test(e.target.value)){
                    setEmailFormat(true)  
                    checkEmail(e.target.value)                 
                } else {
                    setEmailFormat(false)
                }
            }, 300)
            
            setUserDetails(prevValue => {
                return {
                    username: prevValue.username,
                    email: e.target.value,
                    password: prevValue.password
                }
            })
        } else if (e.target.name === "password"){
            if (e.target.value.length>=8){
                setPasswordValid(true)
            } else {
                setPasswordValid(false)
            }
            setUserDetails(prevValue => {
                return {
                    username: prevValue.username,
                    email: prevValue.email,
                    password: e.target.value
                }
            })
        }
    }

    const checkUsername = newUsername => {
        // triggered after stop typing for 500ms
        console.log("Making API call to check username!");
        axios
          .get(
            // `https://insta.nextacademy.com/api/v1/users/check_name?username=${newUsername}`
            `https://nextagram-api.herokuapp.com/api/v1/users/check_name?username=${newUsername}`
          )
          .then(response => {
            if (response.data.valid) {
                setUsernameValid(true);
              
            } else {
                setUsernameValid(false);
          }})};

    const checkEmail = newEmail => {
        axios
        .get(`https://nextagram-api.herokuapp.com/api/v1/users/check_email?email=${newEmail}`)
        .then(response => {
            if (response.data.valid) {
                setEmailValid(true)
            } else {
                setEmailValid(false);
        }})};

    const getInputProp =() => {
        if (!userDetails.username.length){
            return null
        }
        if (userDetails.username.length < 6){
            return {invalid: true}
        }
        if (usernameValid) {
            return { valid: true };
        } else {
        return { invalid: true };
        }
    }

    const getUsernameFormFeedback = () => {
        if (!userDetails.username.length) {
          return null;
        }
        if (userDetails.username.length < 6) {
          return <FormFeedback invalid>Must be at least 6 characters</FormFeedback>;
        }
        if (usernameValid) {
          return <FormFeedback valid>Sweet! That name is available</FormFeedback>;
        } else {
          return <FormFeedback invalid>Sorry! Username is taken</FormFeedback>;
        }
    };

    const getEmailProp = () => {
        if (!userDetails.email.length){
            return null
        } 
        if (!emailFormat) {
            return { invalid: true}
        }
        if (emailFormat && emailValid){
            return {valid: true}
        } else {
            return {invalid: true}
        }
    }

    const getEmailFormFeedback = () => {
        if (!userDetails.email.length){
            return null
        } 
        if (!emailFormat){
            return <FormFeedback invalid>Please enter an email "example@example.com"</FormFeedback>;
        }
        if (emailFormat && emailValid){
            return <FormFeedback valid>Email is good to use!</FormFeedback>
        } 
        if (emailFormat && !emailValid){
            return <FormFeedback invalid>Email already exists!</FormFeedback>
        } 
        
    }

    const getPasswordProp = () => {
        if (!userDetails.password.length){
            return null
        } else if (passwordValid){
            return {valid: true}
        } else {
            return {invalid: true}
        }
    }

    const getPasswordFormFeedback = () => {
        if (!userDetails.password.length){
            return null
        }
        else if (!passwordValid){
            return <FormFeedback invalid>Please enter at least 8 characters</FormFeedback>;
        }
    }

    const onSubmitForm = (e) => {
        e.preventDefault()
        axios({
            method: 'POST',
            // url: 'http://localhost:5000/api/v1/users/new',
            url: 'https://nextagram-api.herokuapp.com/api/v1/users/new',
            data: userDetails
          })
          .then(response => {
            console.log(response)
            localStorage.setItem('jwt', response.data[0].auth_token)
            setLoggedIn(localStorage.getItem('jwt') !== null)
            toast.success('🦄 Sign up successful!', {
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
            toast.error('Try Again!', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        })
    }

    const disabledButton = !usernameValid || !passwordValid || !emailValid

    return (
        <div>
            <Row>
                <h3>Sign Up</h3>
                <Form onSubmit={onSubmitForm} >
                    <FormGroup>
                        <Col lg={{size:4, offset: 4}}>
                            <Label>Username</Label>
                            <Input name="username" type="text" onChange={handleChange} {...getInputProp()} placeholder="Enter a username between 6 and 20 characters"></Input>
                            {getUsernameFormFeedback()}
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col lg={{size:4, offset: 4}}>
                            <Label>Email</Label>
                            <Input name="email" type="email" onChange={handleChange} {...getEmailProp()}></Input>
                            {getEmailFormFeedback()}
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col lg={{size:4, offset: 4}}>
                            <Label>Password</Label>
                            <Input name="password" type="password" onChange={handleChange} {...getPasswordProp()}></Input>
                            {getPasswordFormFeedback()}
                        </Col>
                    </FormGroup>
                    
                    <Col lg={{size:4, offset: 4}} className="sign-up-button">
                        <Button color = "primary" disabled = {disabledButton} type = 'submit'>Sign Up</Button>
                    </Col>
                </Form>
            </Row>
        </div>
    )
}

export default SignUpForm;
