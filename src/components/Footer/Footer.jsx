import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
    return (
        <section className="relative overflow-hidden py-10 bg-amber-100 border-t-2 border-black">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="flex flex-wrap gap-6">
                    <div className="w-full md:w-1/2 lg:w-5/12">
                        <div className="flex flex-col justify-between">
                            <div className="mb-4 inline-flex items-center">
                                <Logo width="100px" />
                            </div>
                            <p className="text-sm text-gray-700">
                                &copy; Copyright 2024. All Rights Reserved by
                                y-ayush.
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-between flex-1">
                        <div className="w-full md:w-1/2 lg:w-2/12">
                            <h3 className="tracking-px mb-6 text-xs font-semibold uppercase text-gray-600">
                                Company
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium text-gray-800 hover:text-red-500"
                                        to="/"
                                    >
                                        Features
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium text-gray-800 hover:text-red-500"
                                        to="/"
                                    >
                                        Pricing
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        className="text-base font-medium text-gray-800 hover:text-red-500"
                                        to="/"
                                    >
                                        Press Kit
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-2/12">
                            <h3 className="tracking-px mb-6 text-xs font-semibold uppercase text-gray-600">
                                Support
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium text-gray-800 hover:text-red-500"
                                        to="/"
                                    >
                                        Account
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium text-gray-800 hover:text-red-500"
                                        to="/"
                                    >
                                        Help
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium text-gray-800 hover:text-red-500"
                                        to="/"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-base font-medium text-gray-800 hover:text-red-500"
                                        to="/"
                                    >
                                        Customer Support
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-3/12">
                            <h3 className="tracking-px mb-6 text-xs font-semibold uppercase text-gray-600">
                                Legals
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium text-gray-800 hover:text-red-500"
                                        to="/"
                                    >
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className="text-base font-medium text-gray-800 hover:text-red-500"
                                        to="/"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-base font-medium text-gray-800 hover:text-red-500"
                                        to="/"
                                    >
                                        Licensing
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Footer;
