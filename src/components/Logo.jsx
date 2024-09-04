import React from "react";

function Logo({ width = "100px" }) {
    return (
        <div className="h-14 w-14">
            <img className="rounded-e-3xl" src="/logo.png"></img>
        </div>
    );
}

export default Logo;
