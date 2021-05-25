import axios from 'axios';
import React, {useState} from 'react';
import {Form, FormGroup, FormText, Button, Input , Label} from 'reactstrap'
import {toast} from 'react-toastify';
import { useHistory } from "react-router-dom";



function UploadMyImages(){
    let history = useHistory();

    const [imageFile, setImageFile] = useState(null)
    const [clickUpload, setClickUpload] = useState(false)

    const handleChange=(e)=> {
        setImageFile(e.target.files[0])
    }

    const handleSubmitFile=(e)=> {
        e.preventDefault();
        let formData = new FormData();
        formData.append("image", imageFile);
        axios.post("https://nextagram-api.herokuapp.com/api/v1/images/upload", 
            formData, {
                headers: {Authorization: `Bearer ${localStorage.jwt}`}
        })
        .then(response => {
            setImageFile(null)
            document.getElementById('upload-image').reset()
            history.push("/profile")
        })
        .catch(error => {
            console.log(error.response);
          });
    }
    
    const clickButton=()=>{
        toast.info('🦄 Wait a moment!', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }

    return (
        <div >
            <div className="my-images-container">
                <Form id="upload-image" onSubmit={handleSubmitFile}>
                    <FormGroup >
                        <div>
                            <Label style={{cursor: "pointer"}} onClick={()=>{setClickUpload(!clickUpload)}}>Add more images to your profile :)</Label>
                        </div>
                        {clickUpload? <div className="d-flex px-4 py-2">
                            <Input type="file" name="image-file" color="primary" onChange={handleChange} />
                            <Button type="submit" color="success" onClick={clickButton}  disabled = {imageFile == null}>Upload</Button>
                        </div>: ""}
                    </FormGroup>
                </Form>
            </div>
        </div>
    )
}



export default UploadMyImages;
