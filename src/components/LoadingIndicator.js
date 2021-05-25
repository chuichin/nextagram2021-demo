import React from 'react';
import Spinner from './images/spinner.gif'

function LoadingIndicator(){
    return (
        <div className="loading-container" >
            <img 
                src={Spinner}
                alt="loader" />
        </div>
    )
}

export default LoadingIndicator;