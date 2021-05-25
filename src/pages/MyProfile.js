import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'

import axios from 'axios';
import LoadingIndicator from "../components/LoadingIndicator";
import ApiUserProfile from '../containers/ApiUserProfile'
import ApiUserImages from "../containers/ApiUserImages"
import MyImages from "../containers/MyImages"
import UploadProfileImage from '../containers/UploadProfileImage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

const MyProfile = ({toLogout, submitProfileImage}) => {
    const [userProfile, setUserProfile] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [userImages, setUserImages] = useState([])
    const [id, setId] = useState("")

    function UserProfile(result){
        setUserProfile(result)
    }

    function IsLoading(status){
        setIsLoading(status)
    }

    
    submitProfileImage(false)
        

    useEffect(() => {
        axios.get(`https://nextagram-api.herokuapp.com/api/v1/users/me`, {
            headers: {Authorization: `Bearer ${localStorage.jwt}`}
        })
        .then(resp => {
            setId(resp.data[0].id)
            setUserProfile(resp.data[0])      
            setIsLoading(false)
        })
        .catch(error => {
            console.log('ERROR: ', error)
        })


    }, [])


    if (isLoading){
        return <LoadingIndicator />
    }

    return (
        <div className="user-container">
            <div className="user-image-container">
                <img className="my-profileImage" src={userProfile.profileImage}/>
            </div>
            <div className="user-name-container">
                <h1>{userProfile.username}</h1>
                
            </div>
            <div className="upload-image-container">
                <div className="d-flex justify-content-center align-items-center">
                    <form action="/">
                        <button onClick={()=> {
                            localStorage.removeItem('jwt');
                            }} type="submit" className="btn btn-primary me-4">Logout</button>
                    </form>
                    <Link to="/upload-profile-image"><FontAwesomeIcon icon={faUpload} size="2x" style={{cursor: 'pointer', color: "purple"}}/></Link>
                </div>
            </div>
            <MyImages id={id} />
        </div>
    )
}

export default MyProfile;