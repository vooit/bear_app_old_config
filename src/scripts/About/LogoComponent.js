/**
 * Created by Wojtek on 2018-02-22.
 */
import React from 'react';

const LogoComponent = () => {
    const style = {
        width: '150px',
        margin: '0 auto',
        display: 'block'
    };
    return (
        <div>
            <img src="src/img/camera.png" style={style}/>
        </div>
    )
};

export default LogoComponent;
