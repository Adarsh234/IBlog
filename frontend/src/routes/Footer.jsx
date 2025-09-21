import React from 'react'
import { GrGithub } from 'react-icons/gr'
import { IoMailOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { FaLinkedinIn } from 'react-icons/fa'
function Footer() {
  return (
    <div className="flex justify-center">
      <div className="w-5/5">
        <hr className=" border border-gray-400" />
        <div className="flex justify-between my-10 font-WorkSans max-md:mx-4 mx-8 max-md:flex-col max-md:items-center max-md:gap-5">
          <div className="flex flex-col w-2/5 items-center justify-center text-center max-md:w-full">
            <div className="drop-shadow-2xl text-4xl italic">
              <span className="font-medium text-5xl text-blue-700 font-worksans">
                I
              </span>
              <span className="font-light text-black font-worksans">Blog</span>
            </div>
            <p className="mt-8 text-lg text-gray-600">
              Unleashing Ideas, Sharing Stories, and Inspiring Minds in the
              Digital World!
            </p>
          </div>

          <div className="text-center max-md:w-full">
            <p className="font-bold text-xl">Useful Links</p>
            <div className="text-lg text-gray-600 flex flex-col gap-3">
              <Link className="mt-3" to="/about">
                About
              </Link>
              <Link to="/">All Blogs</Link>
              <Link to="/write">Create a Blog</Link>
            </div>
          </div>

          <div className="text-center max-md:w-full">
            <p className="font-bold text-xl">Contact</p>
            <div className="text-lg text-gray-600 flex flex-col gap-3">
              <Link to="mailto:adarsh0103sharma@gmail.com" className="mt-3">
                adarsh0103sharma@gmail.com
              </Link>
              <Link to="https://www.linkedin.com/in/adarsh-sharma-b45106308">
                Linkedin
              </Link>
              <Link to="https://github.com/Adarsh234">GitHub</Link>
            </div>
          </div>
        </div>

        

        <div className=" relative flex justify-between items-center max-md:flex-col">
          <div className="flex gap-6 mx-8 mb-3 ml-10">
            <div className="p-2 bg-blue-500 text-3xl rounded-full hover:scale-105 transition-all ease-in-out shadow-xl">
              <a href="mailto:adarsh0103sharma@gmail.com" className="text-black">
                <IoMailOutline />
              </a>
            </div>
            <div className="p-2 text-3xl bg-blue-500 rounded-full hover:scale-105 transition-all ease-in-out shadow-xl">
              <a href="https://github.com/Adarsh234" className="text-black">
                <GrGithub />
              </a>
            </div>
            <div className="p-2 text-3xl bg-blue-500 rounded-full hover:scale-105 transition-all ease-in-out shadow-xl">
              <a
                href="https://www.linkedin.com/in/adarsh-sharma-b45106308"
                className="text-black"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
          <p className=" max-md:text-center md:absolute md:left-[33rem] md:top-2 text-gray-600">
            &copy; 2025 All Rights Reserved | IBlog
          </p>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default Footer