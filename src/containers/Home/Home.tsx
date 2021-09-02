
import { useState, useEffect } from 'react';
import axios from 'axios';
import Post from "../../components/Posts/Post";

const Home = () => {

    //Interfacee

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

    const getAllPost = async () => {
        let res = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
        setPostData(res.data);
        console.log(postData.length)
    }

    const handleDeletePost = (index: number) => {
        const tempData = [...postData];
        tempData.splice(index, 1)
        setPostData(tempData);
    }

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