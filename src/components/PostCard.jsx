import { Link } from "react-router-dom";

function PostCard({ slug, title, featuredImageUrl, status = true }) {
    return (
        <Link to={`/post/${slug}`} className="block">
            <div
                className={`${!status && "opacity-60"} 
                w-full aspectDiv bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out`}
            >
                <div className="relative aspect-square">
                    <img
                        src={featuredImageUrl || "/logo.png"}
                        alt={title}
                        className={`object-cover min-w-72 min-h-72 aspect-square object-center rounded-t-xl`}
                        loading="lazy"
                    />
                </div>
                <div className="p-4">
                    <h2 className="text-base font-bold text-gray-900 mb-2 truncate">
                        {title}
                    </h2>
                </div>
            </div>
        </Link>
    );
}

export default PostCard;
