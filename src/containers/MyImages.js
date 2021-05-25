import React, {useState, useEffect} from 'react';
import axios from 'axios'
import UploadMyImages from "./UploadMyImages"

function MyImages({ id}){

    const [userImages, setUserImages] = useState([])

    useEffect(()=> {
        axios.get(`https://nextagram-api.herokuapp.com/api/v1/images?userId=${id}`)
        .then(resp => {
            setUserImages(resp.data)
        })
        .catch(error => {
            console.log('ERROR: ', error)
            })
        }, [userImages])

    if (userImages.length === 0){
        return (
            <div>
                <br></br>
                <div>
                    You have not upload any pictures yet.
                    <UploadMyImages />
                </div>
            </div>)
    }
    return (
        <div >
            <UploadMyImages />
            <div className="row bottom-images-container">
                {userImages.map((image)=> {
                    return (
                        <div className="col-lg-4">
                            <img className="all-images" src={image} alt="Image"/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyImages