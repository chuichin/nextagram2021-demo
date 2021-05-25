import React, {useEffect, useState} from 'react';
import axios from 'axios'



function ApiUserImages(id, UserImages, ImageLoading){
    axios.get('https://nextagram-api.herokuapp.com/api/v1/images?userId=' + id)
    .then(result => {
        UserImages(result.data)
        ImageLoading(false)

    })
    .catch(error => {
        console.log("ERROR:", error)
    })
   
}

export default ApiUserImages;