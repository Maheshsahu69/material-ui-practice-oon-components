import React from 'react';
//import faker from 'faker';

const CommentDetail =(props)=>{
    return (
        <div className="comment">
            <a > 
                <img alt="avatar" src={props.avatar} />
            </a>
            <div className="content">
                <a href="/" className="author"> 
                    {props.author}
                </a>
                <div className="metadata">
                    <span>{props.timeAgo} </span>
                </div>
                <div className="text">
                    {props.content}
                </div>
            </div>
        </div>
    );
};

export default CommentDetail;