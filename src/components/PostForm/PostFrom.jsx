import React, { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import Service from "../../Services/post.service.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } =
        useForm({
            defaultValues: {
                title: post?.title || "",
                slug: post?.slug || "",
                content: post?.content || "",
                status: post?.status || true,
            },
        });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const [isSubmiting, setIsSubmitting] = useState(false);

    const submit = async (data) => {
        setIsSubmitting(true);

        const formData = new FormData();

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                if (key === "image" && data[key][0]) {
                    formData.append(
                        "featuredImage",
                        data[key][0],
                        data[key][0].name
                    );
                } else {
                    formData.append(key, data[key]);
                }
            }
        }
        if (post) {
            const dbPost = await Service.updatePost(post.slug, formData);
            navigate(`/post/${dbPost.slug}`);
        } else {
            const dbPost = await Service.createPost(formData);
            navigate(`/post/${dbPost.slug}`);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s+/g, "-");
        }
        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), {
                    shouldValidate: true,
                });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="flex flex-col lg:flex-row lg:space-x-4 my-4"
        >
            <div className="flex-1 lg:w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), {
                            shouldValidate: true,
                        });
                    }}
                />
                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>
            <div className=" lg:w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={post.featuredImageUrl}
                            alt={post.title}
                            className="w-full h-auto rounded-lg object-cover"
                            loading="lazy"
                        />
                    </div>
                )}
                <Select
                    options={[
                        { value: true, label: "Active" },
                        { value: false, label: "InActive" },
                    ]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : undefined}
                    className="w-full"
                    disabled={isSubmiting}
                >
                    {isSubmiting ? "Submitting..." : post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
