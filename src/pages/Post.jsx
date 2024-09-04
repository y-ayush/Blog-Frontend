import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Service from "../Services/post.service.js";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Loader from "../components/Loader.jsx";

export default function Post() {
    const [post, setPost] = useState(null);
    const [isSubmiting, setIsSubmitting] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.owner._id === userData._id : false;

    useEffect(() => {
        if (slug) {
            Service.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                } else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = async () => {
        setIsSubmitting(true);
        if (window.confirm("Are you sure you want to delete this post?")) {
            await Service.deletePost(post.slug);
            navigate("/");
        }
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="flex flex-col lg:flex-row lg:space-x-6">
                    <div className="flex-shrink-0 lg:w-1/3 mb-6 lg:mb-0">
                        <img
                            src={post.featuredImageUrl || "/fallbackImg.jpg"}
                            alt={post.title}
                            className="w-full h-auto object-cover rounded-xl"
                            loading="lazy"
                        />
                    </div>

                    <div className="lg:w-2/3">
                        <h1 className="text-3xl font-bold mb-4">
                            {post.title}
                        </h1>
                        <h2 className="m-2 ml-0 font-bold">
                            <Link to={`/user/${post.owner._id}`}>
                                Author : {`${post.owner.name}`}
                            </Link>
                        </h2>
                        <div className="mb-6">
                            <div className="browser-css">
                                {parse(post.content)}
                            </div>
                        </div>

                        {isAuthor && (
                            <div className="flex space-x-4 mt-6">
                                <Link to={`/edit-post/${post.slug}`}>
                                    <Button bgColor="bg-green-500">Edit</Button>
                                </Link>
                                <Button
                                    bgColor="bg-red-500"
                                    onClick={deletePost}
                                    disabled={isSubmiting}
                                >
                                    {isSubmiting ? "Deleting..." : "Delete"}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    ) : (
        <Loader />
    );
}
