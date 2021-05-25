import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import LoadingIndicator from "../components/LoadingIndicator";
import MyImages from "../containers/MyImages"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

const MyProfile = ({submitProfileImage}) => {
    const [userProfile, setUserProfile] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [id, setId] = useState("")

    
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
                <img className="my-profileImage"  alt="profile-img" src={userProfile.profileImage}/>
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