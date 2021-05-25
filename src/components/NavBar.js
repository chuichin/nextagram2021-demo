import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios';
import { useHistory } from "react-router-dom";



function NavBar({loggedIn, searchResult}){
    let history = useHistory();

    const [query, setQuery] = useState("")

    const handleChange =(e) => {
        setQuery(e.target.value)
    }

    const handleSubmit =(e) => {
        e.preventDefault()
        document.getElementById('search-form').reset()
        axios.get("https://nextagram-api.herokuapp.com/api/v1/users/search?search=" + query)
        .then((resp)=>{
            searchResult(resp.data);
            history.push('/search-results')
        })
        .catch((error)=>{
            history.push('/no-results')
        })
    }

    return (
        <div className="nav-custom container-fluid">
            <nav className="navbar navbar-expand-lg navbar-light">
                <Link to="/" className="navbar-brand">The Gram Time</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#side" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="side">
                    <ul className="navbar-nav ms-auto">
                        <form id="search-form" className="d-flex" onSubmit={handleSubmit}>
                            <input className="form-control me-2" type="search" onChange={handleChange} placeholder="Search" aria-label="Search"></input>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        <li className="nav-item nav-user-custom">
                            <Link to="/users" className="nav-link">Users</Link>
                        </li>
                        <li className="nav-item nav-signup-custom">
                            {/* Button clicked to return the Modal */}
                            {loggedIn? <Link to="/profile" className="nav-link">Profile</Link>: <Link to="/modal" className="nav-link">Login</Link>}
                        </li>
                    </ul>
                </div>
            </nav>
            
        </div>
    )
}

export default NavBar
