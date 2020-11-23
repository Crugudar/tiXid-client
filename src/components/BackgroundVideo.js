import React from 'react'
import classes from './BackgroundVideo.module.css'

const BackgroundVideo = () => {
    const videoSource = "../../public/VIDEO_Dixit_Boxart.mp4"
    return (
        <div className={classes.Container}>
            <video autoPlay='autoplay' loop='loop' muted className={classes.Video}>
                <source src={videoSource} type="video/mp4"></source>
            </video>

        </div>
    )
}
export default BackgroundVideo