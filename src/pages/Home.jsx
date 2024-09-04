import React, { useEffect, useState } from "react";
import Service from "../Services/post.service.js";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import Loader from "../components/Loader.jsx";
import { set } from "react-hook-form";

function Home() {
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [disableNextBtn, setDisableNextBtn] = useState(false);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        Service.getPosts(page)
            .then((res) => {
                if (res.posts) {
                    setPosts(res.posts);
                }
                if (!res.hasMorePosts) {
                    setDisableNextBtn(true);
                } else {
                    setDisableNextBtn(false);
                }
            })
            .catch(() => {
                if (page > 1) {
                    setPage(page - 1);
                }
                throw new Error("404, No More Posts");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [page]);

    if (loading) {
        return <Loader />;
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-col justify-center items-center">
                        <div className="p-4">
                            <h1 className="text-xl md:text-2xl font-bold text-gray-700">
                                {authStatus
                                    ? "No Posts Available at this time"
                                    : "Login to view Posts"}
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-4">
            <Container>
                <div className="flex flex-wrap m-2">
                    {posts.map((post) => (
                        <div
                            key={post.slug}
                            className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                        >
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-1 mx-4">
                    {page !== 1 ? (
                        <button
                            className="px-4 py-2 text-white bg-blue-500 rounded-s-2xl rounded-md hover:bg-blue-600"
                            onClick={() => setPage(page - 1)}
                        >
                            Prev
                        </button>
                    ) : (
                        <div />
                    )}
                    {!disableNextBtn ? (
                        <button
                            className="px-4 py-2 text-white bg-blue-500 rounded-e-2xl rounded-md hover:bg-blue-600"
                            disabled={disableNextBtn}
                            onClick={() => setPage(page + 1)}
                        >
                            Next
                        </button>
                    ) : (
                        <div />
                    )}
                </div>
            </Container>
        </div>
    );
}

export default Home;
