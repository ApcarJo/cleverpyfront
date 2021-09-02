
import { useState, useEffect } from 'react';
import axios from 'axios';
import Post from "../../components/Posts/Post";

const Home = () => {

    //Interface
    interface post {
        userId: number;
        id: number;
        title: string;
        body: string;
    }

    //Hook
    const [postData, setPostData] = useState<post[] | []>([]);

    useEffect(() => {
        getAllPost();
    }, []);


    //Receiving all the posts and saving in a variable
    const getAllPost = async () => {
        let res = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
        setPostData(res.data);
    }

    //Removing the selected post from the array
    const handleDeletePost = (index: number) => {
        const tempData = [...postData];
        tempData.splice(index, 1)
        setPostData(tempData);
    }

    //Calling to the Post component to draw the posts with a .map method.
    if (postData.length > 1) {
        return (
            <div className="viewHome">
                <h1>Cleverpy Forum</h1>
                <div className="content">
                    {postData?.map((val, index) => (
                        <Post userId={val.userId} id={val.id} title={val.title} body={val.body} onDeletePost={handleDeletePost} postIndex={index}></Post>
                    ))}
                </div>
            </div>
        )
    } else {
        return (
            <h4>Loading</h4>)
    }
}

export default Home;