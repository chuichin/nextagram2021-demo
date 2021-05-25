import React from 'react';

function UserImageProfile(props){
    const images= props.images
    if (images.length === 0){
        return (<div><br></br><div>User have not upload any pictures yet.</div></div>)
    }
    return (
        <div className="row">
                {images.map((image)=> {
                    return (
                        <div className="col-lg-3">
                            <img className="all-images" src={image} alt="user-img"/>
                        </div>
                    )
                })}
        </div>
    )
}
export default UserImageProfile;