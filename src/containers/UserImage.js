import React, {useState, useEffect} from 'react';
import LoadingIndicator from '../components/LoadingIndicator';
import ApiUserImages from "../containers/ApiUserImages"


function UserImage(props){
    const [images, setImages] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    function UserImages(result){
        setImages(result)
    }
    
    function ImageLoading(status){
        setIsLoading(status)
    }

    useEffect(()=> {
        ApiUserImages(props.id, UserImages, ImageLoading)
    }, [props.id])

    

    return (
        <div >
            <div className="row">
                {isLoading? <LoadingIndicator/> : (images.length===0)? <div className='d-flex my-5'>This user yet to have any images.</div> : images.map(image => {
                    return (
                        <div className="userImage-container col-lg-4">
                            <img className="userImage" alt="user-img" src={image} />
                        </div>
                    )})}                
            </div>

        </div>
    )
}

export default UserImage;