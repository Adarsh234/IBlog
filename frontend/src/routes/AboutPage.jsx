import React from 'react'
import { TbWorld } from 'react-icons/tb'
import { GrGithub } from 'react-icons/gr'
import { FaLinkedinIn } from 'react-icons/fa'
import { IoMailOutline } from 'react-icons/io5'
import { BsTwitterX } from 'react-icons/bs'
import './Aboutpage.css'
import Myself from './Myself/Myself'
import Footer from './Footer'

const About = () => {
  return (
    <div className="relative backGround-Gradient-Light">
      <div className="flex flex-col items-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row max-md:pt-0 py-8">
            <div className="lg:hidden w-full mb-8">
              <Myself />
            </div>

            <div className="flex-1 flex flex-col  justify-center space-y-8 max-md:flex-col max-md:items-center max-md:justify-center">
              <div className="backdrop-filter max-md:w-11/12 bg-blue-200 backdrop-blur-md bg-opacity-10 border border-gray-100 rounded-xl shadow-lg p-6 transition duration-500">
                <h1 className="font-bold text-4xl mb-4 bg-gradient-to-r from-blue-600 to-lightBlack bg-clip-text text-transparent">
                  About{' '}
                  <span className="font-worksans italic">
                    <span className="text-blue-700 font-medium">I</span>
                    <span className="font-light text-3xl text-black">Blog</span>
                  </span>
                </h1>
                <p className="text-base sm:text-lg leading-relaxed text-left">
                  IBlog is a dynamic and user-friendly blogging platform built
                  using the MERN (MongoDB, Express, React, Node.js) stack.
                  <br />
                  Iblog is a space where ideas come to life and knowledge meets
                  creativity. Our mission is to share insightful content on
                  technology, personal experiences, and emerging trends across
                  various domains. We aim to inspire readers and foster a
                  community where thoughts, stories, and knowledge are
                  celebrated. Stay connected, learn, and grow with us! 🚀
                </p>
              </div>

              {/* About ME */}
              <div className="backdrop-filter max-md:w-11/12 bg-blue-200 backdrop-blur-md bg-opacity-10 border border-gray-100 rounded-xl shadow-lg p-6 transition duration-500">
                <h1 className="font-bold text-4xl mb-4 mt-4 bg-gradient-to-r from-blue-600 to-lightBlack bg-clip-text text-transparent">
                  Who am I
                </h1>
                <p className="text-base sm:text-lg leading-relaxed text-left">
                  Full Stack Web Developer with a passion for building dynamic
                  and responsive web applications. Skilled in FRONT-END
                  technologies such as HTML, CSS, JavaScript, and ReactJS, as
                  well as BACK-END technologies including Node.js, Firebase,
                  PHP, Express.js, My-SQL and MongoDB. Comfortable working with
                  frameworks and libraries like Bootstrap, Material-UI, and
                  Tailwind CSS. Dedicated to continuous learning and staying
                  up-to-date with the latest industry trends. Let's connect and
                  create innovative solutions together!
                </p>
              </div>

              {/* Connect with Us */}
              <div className="backdrop-filter bg-blue-200 backdrop-blur-md bg-opacity-10 border border-gray-100 rounded-xl shadow-lg p-6 transition duration-500">
                <h1 className="font-bold text-4xl mb-4 bg-gradient-to-r from-blue-600 to-lightBlack bg-clip-text text-transparent">
                </h1>
                <div className="flex justify-start space-x-6 text-2xl sm:text-3xl">
                  Connect me!
                  <a
                    href="https://github.com/Adarsh234"
                    target="_"
                    title="Github"
                  >
                    <GrGithub className=" hover:scale-110 transition-all ease-in-out mr-2 cursor-pointer" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/adarsh-sharma-b45106308"
                    target="_"
                    title="LinkedIn"
                  >
                    <FaLinkedinIn className=" hover:scale-110 transition-all ease-in-out cursor-pointer mr-2" />
                  </a>
                  <a
                    href="mailto:adarsh0103sharma@gmail.com"
                    target="_"
                    title="Mail"
                  >
                    <IoMailOutline className=" hover:scale-110 transition-all ease-in-out cursor-pointer mr-2" />
                  </a>
                  <a href="" target="_" title="Twitter">
                    <BsTwitterX className=" hover:scale-110 transition-all ease-in-out cursor-pointer mr-2" />
                  </a>
                  <a
                    href="https://knowaboutadarsh.netlify.app/"
                    target="_"
                    title="Portfolio"
                  >
                    <TbWorld className=" hover:scale-110 transition-all ease-in-out  cursor-pointer" />
                  </a>
                </div>
              </div>
            </div>

            <div className="hidden lg:block lg:w-1/3">
              <Myself />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default About