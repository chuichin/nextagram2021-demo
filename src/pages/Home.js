import React from 'react';
import {toast} from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

function Home(){


    return (
        <div className='home-container row'>
        
            {/* Carousel */}
            <div class="col-lg-7 ">
                
                <div id="carouselExampleIndicators" className="carousel slide carousel-fade" data-bs-ride="carousel">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="img-custom img-thumbnail" alt="..." src="https://cdn.pixabay.com/photo/2016/11/19/17/05/lady-1840348_1280.jpg" />
                        </div>
                        <div class="carousel-item">
                            <img className="img-custom img-thumbnail" alt="..." src="https://cdn.pixabay.com/photo/2017/12/28/22/03/lens-3046269_1280.jpg" />
                        </div>
                        <div class="carousel-item">
                            <img className="img-custom img-thumbnail" alt="..." src="https://cdn.pixabay.com/photo/2016/11/29/04/54/photographer-1867417_1280.jpg" />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            <div className="title-custom col-lg-5">
                    <p>Capture your best moments with Gram Time</p>
            </div>
            <div className="jumbotron-home h-100 p-5 text-white bg-dark rounded-3">
                <h2>Guide to using this website</h2>
                <p></p>
                <p>This page is built with ReactJS for frontend and Python Flask for backend.</p>
                <p>This page allows you to create an account. After signing up/login, you can up upload one profile image and other images for your account, search for existing users via search bar on top.</p>
                <p>The frontend codes for this page is found <a href="https://google.com">here</a>, backend codes <a href="https://google.com">here</a> and the documentation for API <a href="https://google.com">here</a>.</p>
            </div>
            
        </div>
        
    )
}

export default Home;