import React from "react";
import { FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";

const SocialLinks = () => {
    const links = [
        {
            id: 1,
            child: (
                <>
                    Facebook <FaSquareFacebook size={30} />
                </>
            ),
            href: "https://facebook.com",
            style: "rounded-tr-md",
        },
        {
            id: 2,
            child: (
                <>
                    Twitter <BsTwitterX size={30} />
                </>
            ),
            href: "https://twitter.com",
        },
        {
            id: 3,
            child: (
                <>
                    Linkedin <FaLinkedin size={30} />
                </>
            ),
            href: "https://linkedin.com",
        },
        {
            id: 4,
            child: (
                <>
                    Youtube <FaYoutube size={30} />
                </>
            ),
            href: "https://youtube.com"
        }
    ];

    return (
        <div className="flex flex-col sm:top-[35%] top-[55%] left-0 fixed ">
            <ul>
                {links.map(({ id, child, href, style }) => (
                    <li
                        key={id}
                        className={
                            "flex justify-between items-center w-40 h-14 px-4 ml-[-100px] hover:ml-[-10px] hover:rounded-md duration-300 bg-gray-500" +
                            " " +
                            style
                        }
                    >
                        <a
                            href={href}
                            className="flex justify-between items-center w-full text-white"
                            target="_blank"
                            rel="noreferrer"
                        >
                            {child}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SocialLinks;