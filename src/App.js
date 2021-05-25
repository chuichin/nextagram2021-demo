import React, {useState} from 'react'
import NavBar from './components/NavBar'
import Home from "./pages/Home"
import Users from './pages/Users'
import UserProfile from "./pages/UserProfile"
import {Route, Link, Redirect} from 'react-router-dom'
import SignUpForm from './pages/SignUpForm'
import Modal from "./pages/Modal";
import LoginForm from './pages/LoginForm'
import MyProfile from "./pages/MyProfile"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UploadMyImages from './containers/UploadMyImages'
import UploadProfileImage from './containers/UploadProfileImage'
import SearchResult from "./containers/SearchResult"
import NoResult from "./containers/NoResult"

function App() {

  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('jwt') !== null)
  const [submitted, setSubmmitted] = useState(false)
  const [searchResult, setSearchResult] = useState([])

  const submitProfileImage = (status) => {
    setSubmmitted(status)
  }
  

  const toSearchResult = (result) => {
    setSearchResult(result)
  }
  

  return (
    <div className="App">
     <ToastContainer />
      <NavBar loggedIn={loggedIn}  searchResult={toSearchResult} />
      <Route exact path="/search-results">
        <SearchResult searchResult={searchResult} />
      </Route>
      <Route exact path="/no-results" component={NoResult}/>
      <Route exact path="/">
        <Home  />
      </Route>
      <Route exact path="/users" component={Users} />
      <Route path="/users/:id" component={UserProfile}/>
      <Route path="/modal">
        {loggedIn? <Redirect to="/profile"></Redirect>:<Modal setLoggedIn={setLoggedIn}  />}
      </Route>
      <Route exact path="/profile">
        {loggedIn? <MyProfile submitProfileImage={submitProfileImage}/> : <Redirect to="/modal" />}
      </Route>
      <Route exact path="/upload-profile-image">
        {submitted? <Redirect to="/profile" /> : <UploadProfileImage submitProfileImage={submitProfileImage} /> }
      </Route>
      <Route exact path="/logout">
        {loggedIn? <Redirect to="/profile" />:<Redirect to="/" ></Redirect>}
      </Route>

    </div>
  );
}

export default App;
