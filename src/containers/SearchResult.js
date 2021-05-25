import React, {useEffect, useState} from 'react';
import axios from 'axios'
import { useHistory } from "react-router-dom";
import {Link} from 'react-router-dom'
import UserImage from '../containers/UserImage';


const SearchResult = ({searchResult}) => {
    let history = useHistory();

    const userList = searchResult
    const [combinedUsers, setCombinedUsers] = useState([])

    
    useEffect(()=> {
        setCombinedUsers([])
        userList.map((id)=> {
            axios.get('https://nextagram-api.herokuapp.com/api/v1/users/' + id)
            .then(result => {
                setCombinedUsers(prevValue => {
                    return [...prevValue, result.data[0]]
                })               
            })
            .catch(error=> {
                console.log(error)
            })
        })
    }, [userList])

    

    return (
        <div className="d-flex  flex-wrap result-container">
            {combinedUsers.map((user)=> {
                return (
                    <div className="card-container">
                        <div className="card bg-warning" style={{width: "20rem", height:"25rem"}}>
                            <div className="card-body">
                                <img className="card-image" src={user.profileImage}></img>
                            </div>
                            <h3 className="card-title">{user.username}</h3>
                            <div className="card-body">
                                <Link to={`/users/${user.id}`} type="button" class="see-more-btn btn">See More..</Link>
                            </div>
                        </div>
                    </div> 
                )
            })}

        </div>
    )


}

export default SearchResult;