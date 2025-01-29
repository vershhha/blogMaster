import React from 'react'
import { Link } from "react-router";
import { Logo } from '../index'

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-[#172842] border border-t-2 border-t-black">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="-m-6 flex flex-wrap">
                    <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                        <div className="flex h-full flex-col justify-evenly">
                            <div className="inline-flex items-center">
                                <Logo width="50px" className="m-4" />
                                <p className="text-xl font-medium text-gray-300">MyBlog</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-200">
                                    &copy; Copyright 2025. All Rights Reserved by vershha.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9  text-base font-semibold uppercase text-gray-200">
                                Company
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className=" text-gray-300 text-sm hover:text-gray-400"
                                        to="/"
                                    >
                                        Features
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-sm text-gray-300 hover:text-gray-400"
                                        to="/"
                                    >
                                        Pricing
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-sm text-gray-300 hover:text-gray-400"
                                        to="/"
                                    >
                                        Affiliate Program
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-sm text-gray-300 hover:text-gray-400"
                                        to="/"
                                    >
                                        Press Kit
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9  text-base font-semibold uppercase text-gray-200">
                                Support
                            </h3>
                            <ul >
                                <li className="mb-4">
                                    <Link
                                        className=" text-sm text-gray-300 hover:text-gray-400"
                                        to="/"
                                    >
                                        Account
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-sm text-gray-300 hover:text-gray-400 "
                                        to="/"
                                    >
                                        Help
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className="text-sm text-gray-300 hover:text-gray-400"
                                        to="/"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-sm text-gray-300 hover:text-gray-400"
                                        to="/"
                                    >
                                        Customer Support
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-3/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9  text-base font-semibold uppercase text-gray-200">
                                Legals
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className=" text-sm text-gray-300 hover:text-gray-400"
                                        to="/"
                                    >
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-sm text-gray-300 hover:text-gray-400"
                                        to="/"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-sm text-gray-300 hover:text-gray-400"
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
  )
}

export default Footer