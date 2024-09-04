import fetchAPI from "../utils/fetchAPI.js";
import conf from "../conf/conf.js";

const serverUrl = conf.serverUrl;
const url = serverUrl + "/api/v1/users";

class UserService {
    async createAccount({ name, email, password }) {
        const data = await this._handleAPI(
            `${url}/register`,
            { name, email, password },
            "POST"
        );
        if (data) {
            await this.login({ email, password });
        }
        return data;
    }

    async login({ email, password }) {
        return await this._handleAPI(
            `${url}/login`,
            { email, password },
            "POST"
        );
    }

    async logout() {
        return await this._handleAPI(`${url}/logout`, null, "POST");
    }

    async getCurrentUser() {
        return await this._handleAPI(
            `${url}/get-current-user`,
            null,
            "GET",
            false
        );
    }

    async getUserName(userId) {
        return await this._handleAPI(`${url}/id/${userId}`, null, "GET", false);
    }

    async refreshToken() {
        return await this._handleAPI(`${url}/refresh-token`, null, "GET");
    }

    async _handleAPI(endpoint, data = null, method = "GET", throwError = true) {
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

const userService = new UserService();
export default userService;
