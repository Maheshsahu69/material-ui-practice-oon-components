import React from 'react';
import VideoItems from './VideoItems'

const VideoList =(props)=>{
   const renderedList= props.videos.map((video)=>{
       return <VideoItems key={video.id.videoId} video={video} onSelectedVideo={props.onSelectedVideo} />
   });
    return (
    <div className="ui relaxed divided list">{renderedList}</div>
    );
}

export default VideoList;   