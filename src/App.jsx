import "./App.css";
import { useEffect, useState } from "react";
import authService from "./Services/user.service.js";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./features/auth.slice.js";
import { Outlet } from "react-router-dom";

import { Header, Footer } from "./components";
import Loader from "./components/Loader.jsx";

function App() {
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        authService
            .getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(login({ userData }));
                } else dispatch(logout());
            })
            .catch((e) =>
                console.error("app.jsx  :: loading error :: error :: ", error)
            )
            .finally(() => setLoading(false));
    }, []);

    return !loading ? (
        <div className="min-h-screen flex flex-wrap content-between bg-amber-50">
            <div className="w-full block ">
                <Header />
                <main>{<Outlet />}</main>
                <Footer />
            </div>
        </div>
    ) : (
        <Loader />
    );
}

export default App;
