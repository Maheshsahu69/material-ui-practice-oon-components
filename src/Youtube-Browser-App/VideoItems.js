import React from 'react';
import './VideoItems.css'

const VideoItems =(props)=>{
    return (
        <div onClick={()=>{props.onSelectedVideo(props.video)}} className="video-item item">
            <img alt={props.video.snippet.title} className="ui image" src={props.video.snippet.thumbnails.medium.url}/>
            <div className="content">
                <div className="header">
                    {props.video.snippet.title}
               </div>
            </div>
        </div>
    );
}

export default VideoItems; 