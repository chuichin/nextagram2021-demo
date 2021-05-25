import axios from 'axios'

function ApiUserProfile(id, UserProfile, IsLoading){
    axios.get('https://nextagram-api.herokuapp.com/api/v1/users/' + id)
        .then(result => {
            UserProfile(result.data[0])
            IsLoading(false)

        })
        .catch(error => {
            console.log("ERROR:", error)
        })
}

export default ApiUserProfile
