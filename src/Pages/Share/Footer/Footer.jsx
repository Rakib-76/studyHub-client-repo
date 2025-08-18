import React from 'react';
import StudyHubLogo from '../StudyHubLogo/StudyHubLogo';
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link as ScrollLink } from 'react-scroll'; // 👈 import scroll link

const Footer = () => {
    return (
        <footer className="footer footer-horizontal footer-center bg-gradient-to-r from-[#78C841] via-transparent to-[#B4E50D] text-neutral-content p-10">
            <aside>
               <div className='text-black'>
                 <StudyHubLogo />
               </div>
                <nav className="flex gap-4">
                    <ScrollLink
                        to="about"      // section er id
                        smooth={true}   // smooth scroll
                        duration={500}  // 0.5s e scroll hobe
                        className=" text-black cursor-pointer hover:underline hover:text-green-700"
                    >
                        About
                    </ScrollLink>

                    <ScrollLink
                        to="contact"
                        smooth={true}
                        duration={500}
                        className="cursor-pointer text-black hover:underline  hover:text-green-700"
                    >
                        Contact
                    </ScrollLink>

                    <ScrollLink
                        to="projects"
                        smooth={true}
                        duration={500}
                        className="cursor-pointer text-black hover:underline  hover:text-green-700"
                    >
                        Projects
                    </ScrollLink>
                </nav>
            </aside>
            <nav>
                {/* Social Icons */}
                <div className="flex gap-4">
                    <a
                        href="https://github.com/Rakib-76"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black hover:text-white transition-colors duration-300"
                    >
                        <FaGithub size={28} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/rakib76"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black hover:text-white transition-colors duration-300"
                    >
                        <FaLinkedin size={28} />
                    </a>
                    <a
                        href="https://www.facebook.com/rakib.hasan.190064"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black hover:text-white transition-colors duration-300"
                    >
                        <FaFacebook size={28} />
                    </a>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;
