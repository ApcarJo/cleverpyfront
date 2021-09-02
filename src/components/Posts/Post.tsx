
import { useState } from 'react';
import axios from 'axios';

interface appProps {
    userId: number;
    id: number;
    title: string;
    body: string;
    onDeletePost: (postIndex: number) => void;
    postIndex: number;
}

interface comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

export default function Post({ userId, id, title, body, onDeletePost, postIndex }: appProps) {

    //HOOK
    //Boolean to control the hide and show of the comments
    const [viewData, setViewData] = useState<boolean>(false);
    const [commentData, setCommentData] = useState<comment[] | []>([]);

    const handlePostClick = async (postId: number) => {
        //Checking first that commentData value is empty.
        if (commentData.length === 0) {
            let res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
            setCommentData(res.data);
        }
        setViewData(!viewData)
    }

    if (userId) {
        return (
            <div>
                <div className="card">
                    <div className="row cardHeader">
                        <div className="userHeader">#{userId}</div>
                        <div className="titleHeader">{title}</div>
                        <div className="row maxWidth">
                            <div className="idHeader">{id}</div>
                            <div className="deleteButton" onClick={() => onDeletePost(postIndex)}>Delete</div>
                        </div>
                    </div>
                    <div className="bodyContent">{body}</div>
                    <button className="extendButton" onClick={() => handlePostClick(id)}>{viewData ? "Hide" : "Extend"} </button>
                </div>
                {/* Comments will be only called to the json api when you push the extend button and then they will be rendered */}
                {viewData && (<div className="comments">
                    {commentData.length === 0 && (<div><span>Is loading</span></div>)}
                    {commentData.length && commentData.map((value, index) => (
                        <div className="commentCard" key={value.id}>
                            <div className="row cardHeader">
                                <div className="userHeader">#{value.id}</div>
                                <div className="titleHeader">{value.name}</div>
                            </div>
                            <div className="bodyContent">{value.body}</div>
                        </div>
                    ))}
                </div>)}
            </div>
        )
    } else {
        return (<h4>Loading</h4>);
    }
}