import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components/index.js";
import Service from "../Services/post.service.js";
import userService from "../Services/user.service.js";
import { useParams } from "react-router-dom";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [author, setAuthor] = useState({});

    const { userId } = useParams();

    useEffect(() => {
        Service.getUserPosts(userId).then((posts) => setPosts(posts));
        userService.getUserName(userId).then((author) => setAuthor(author));
    }, [userId]);

    return (
        <div className="w-full py-8">
            <Container>
                <div className=" bg-amber-100 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out  p-4 m-4 ">
                    <h2 className="text-lg font-semibold">Author Details:</h2>
                    <div className="flex justify-between ">
                        <h4 className="mt-2 sm:mr-20 ">Name: {author?.name}</h4>
                        <h4 className="mt-2">Total Posts: {posts?.length} </h4>
                    </div>
                </div>

                <div className="flex flex-wrap m-2">
                    {posts.map((post) => (
                        <div
                            key={post.slug}
                            className={`p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 relative`}
                        >
                            {!post.status && (
                                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10 ">
                                    Inactive
                                </div>
                            )}
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;
