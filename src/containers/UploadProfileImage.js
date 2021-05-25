import axios from 'axios';
import React, {useState} from 'react';
import {Form, FormGroup,Button, Input , Label} from 'reactstrap'
import { toast } from 'react-toastify';



function UploadMyImages({submitProfileImage}){
    const [imageFile, setImageFile] = useState(null)
    const [displayImage, setDisplayImage] = useState(null)

    const handleChange=(e)=> {
        setImageFile(e.target.files[0])
        setDisplayImage(URL.createObjectURL(e.target.files[0]))
    }

    const clickButton=()=>{
        toast.info('🦄 Wait a moment!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }


    const handleSubmitFile=(e)=> {
        e.preventDefault();
        
        let formData = new FormData();
        formData.append("user_image", imageFile);
        axios.put("https://nextagram-api.herokuapp.com/api/v1/users/profileImage", 
            formData, {
                headers: {Authorization: `Bearer ${localStorage.jwt}`}
        })
        .then(response => {
            setImageFile(null)
            submitProfileImage(true)
            
        })
        .catch(error => {
            console.log(error.response);
          });
    }
    
    return (
        <div >
            <div className="profile-image-container">
                <Form onSubmit={handleSubmitFile}>
                    <FormGroup >
                        <div>
                            <Label style={{cursor: "pointer"}}>Edit your profile picture :)</Label>
                        </div>
                        <div className="d-flex px-4 py-2">
                            <Input type="file" name="image-file" color="primary" onChange={handleChange} />
                            <Button type="submit" onClick={clickButton} color="success" disabled = {imageFile == null}>Upload</Button>
                        </div>
                    </FormGroup>
                </Form>
            </div>
            <div className="display-profile-image-container">
                {imageFile? <h3>Click upload if this is correct<img className="profile-image-check" alt="profile-img" src={displayImage} /></h3> : ""}
            </div>
        </div>
    )
}



export default UploadMyImages;
