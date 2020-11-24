import React from 'react'
import classes from './BackgroundVideo.module.css'

const BackgroundVideo = () => {
    const videoSource = "../../public/VIDEO_Dixit_Boxart.mp4"
    return (
        <div className={classes.Container} >
            <video autoPlay="autoplay" loop="loop" muted className={classes.Video} >
                <source src={videoSource} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className={classes.Content}>
                <div className={classes.SubContent} >
                <p>BIENVENIDO {props.user.username && props.user.username}.</p>
          <br />
         
            <Link to="/game">
              <button>Jugar</button>
            </Link> 
                </div>
            </div>
        </div>
)
    }
export default BackgroundVideo