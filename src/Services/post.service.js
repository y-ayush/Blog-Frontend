import fetchAPI from "../utils/fetchAPI.js";
import conf from "../conf/conf.js";

const serverUrl = conf.serverUrl;
const url = serverUrl + "/api/v1/posts";

class PostService {
    async createPost(data) {
        return await this._handleAPI("/create", data, "POST");
    }

    async getPost(slug) {
        return await this._handleAPI(`/${slug}`);
    }

    async updatePost(slug, data) {
        return await this._handleAPI(`/${slug}`, data, "PATCH");
    }

    async deletePost(slug) {
        return await this._handleAPI(`/${slug}`, null, "DELETE");
    }

    async getPosts(page = 1) {
        return await this._handleAPI(`/all/posts?page=${page}`);
    }

    async getUserPosts(userId) {
        return await this._handleAPI(`/user/${userId}`);
    }

    async _handleAPI(endpoint, data = null, method = "GET", throwError = true) {
        endpoint = url + endpoint;
        try {
            return await fetchAPI(endpoint, data, method);
        } catch (error) {
            if (throwError) {
                throw error;
            } else {
                console.log("ERROR :: ", error);
                console.error(
                    error?.message || `API call to ${endpoint} failed`
                );
                return null;
            }
        }
    }
}
const postService = new PostService();
export default postService;
