import axios from 'axios'
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import UserImage from '../containers/UserImage';
import LoadingIndicator from "../components/LoadingIndicator"

function Users(){
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    
    useEffect(()=> {
        axios.get('https://nextagram-api.herokuapp.com/api/v1/users')
        .then(result => {
            console.log(result.data)
            setUsers(result.data)
            setIsLoading(false)
        })
        .catch(error => {
            console.log("ERROR:", error)
        })
    }, [])

    if (isLoading){
        return <LoadingIndicator/>
    }

    return (
        <div>
            {(users.length===0)? <p>No users created yet</p> : users.map((user)=> {
                return (
                    <div class="row">
                        <div class="col-lg-3 py-3">
                            <div className="profileContainer">
                                
                                <img className="profileImage" src={user.profileImage}></img>
                                <h3>{user.username}</h3>
                                <div>
                                    <Link to={`/users/${user.id}`} type="button" class="see-more-btn btn">See More..</Link>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-9 py-3">
                            <UserImage key={user.id} id={user.id}/>
                        </div>
                    </div> 
                )
            })}
        </div>
    )
}

export default Users;