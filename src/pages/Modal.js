import React, {useState} from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm'
import {Row, Col } from 'reactstrap';


function Modal({setLoggedIn}){
    const [newUser, setNewUser] = useState(true)

    return (
       <div class="container modal-container">
            {newUser? <LoginForm setLoggedIn={setLoggedIn}/>: <SignUpForm setLoggedIn={setLoggedIn}/>} 
            <Row>
                <Col lg={{size:4, offset: 4}}>
                    <div>
                        {newUser?  <div > New user? <button class="btn btn-link" onClick={(()=> setNewUser(!newUser))}>Sign Up</button></div>: <div> Already a User? <button class="btn btn-link" onClick={(()=> setNewUser(!newUser))}> Login</button></div > }
                    </div>
                </Col>
            </Row>
       </div>
    )
}

export default Modal