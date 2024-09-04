import React from "react";
import Container from "./Container/Container.jsx";

function Loader() {
    return (
        <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex justify-center items-center h-64">
                    <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-amber-500 border-t-transparent"></div>
                </div>
            </Container>
        </div>
    );
}

export default Loader;
