import React, {useEffect, useState} from 'react';
import{useParams} from 'react-router-dom';
import LoadingIndicator from "../components/LoadingIndicator"
import ApiUserProfile from '../containers/ApiUserProfile'
import ApiUserImages from "../containers/ApiUserImages"
import UserImageProfile from "../containers/UserImageProfile"


function UserProfile(){
    
    const [userProfile, setUserProfile] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [userImages, setUserImages] = useState([])
    const [isImageLoading, setImageLoading] = useState(true)
    const {id} = useParams()

    function UserProfile(result){
        setUserProfile(result)
    }

    function IsLoading(status){
        setIsLoading(status)
    }

    function UserImages(result){
        setUserImages(result)
    }
    
    function ImageLoading(status){
        setImageLoading(status)
    }

    useEffect(()=> {
        ApiUserProfile(id, UserProfile, IsLoading)
        ApiUserImages(id, UserImages, ImageLoading)
    }, [id])

    if (isLoading){
        return <LoadingIndicator />
    }

    return (
        <div className="user-container">
            <div className="user-image-container">
                <img className="profileImage" alt="user-profile" src={userProfile.profileImage}/>
            </div>
            <div className="user-name-container">
                <h1>{userProfile.username}</h1>
            </div>
            {isImageLoading? <LoadingIndicator ImageLoading={ImageLoading}/> :<UserImageProfile images={userImages}/> }
        </div>
    )

    
}

export default UserProfile;