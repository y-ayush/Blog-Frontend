import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../Services/user.service.js";
import { logout as logoutFeature } from "../../features/auth.slice.js";

function LogoutBtn() {
    const dispatch = useDispatch();

    async function logoutHandler() {
        try {
            await authService.logout();
            dispatch(logoutFeature());
        } catch (error) {
            console.error("Logout failed", error);
        }
    }

    return (
        <button
            className="inline-block px-6 py-2 text-gray-800 bg-gray-200 rounded-full shadow-sm border border-transparent hover:bg-red-500 hover:text-white focus:outline-none transition-colors duration-200"
            onClick={logoutHandler}
        >
            Logout
        </button>
    );
}

export default LogoutBtn;
