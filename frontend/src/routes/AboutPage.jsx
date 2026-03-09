import React from 'react'
import { TbWorld } from 'react-icons/tb'
import { GrGithub } from 'react-icons/gr'
import { FaLinkedinIn } from 'react-icons/fa'
import { IoMailOutline } from 'react-icons/io5'
import { BsTwitterX } from 'react-icons/bs'
import Myself from './Myself/Myself'
import Footer from './Footer'

const About = () => {
  return (
    <div className="relative min-h-screen pt-8 pb-16">
      <div className="flex flex-col items-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            
            {/* MOBILE VIEW MYSELF COMPONENT */}
            <div className="lg:hidden w-full mb-4">
              <Myself />
            </div>

            {/* LEFT SIDE: TEXT CONTENT */}
            <div className="flex-1 flex flex-col justify-center gap-8">
              
              {/* About Platform Card */}
              <div className="bg-white/80 backdrop-blur-md border border-slate-100 rounded-[2rem] shadow-sm p-8 md:p-10 transition-shadow duration-300 hover:shadow-md">
                <h1 className="font-extrabold text-3xl md:text-4xl mb-6 bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent tracking-tight">
                  About{' '}
                  <span className="font-black text-slate-800">
                    I<span className="font-light text-slate-700">Blog</span>
                  </span>
                </h1>
                <p className="text-base sm:text-lg leading-relaxed text-slate-600 font-medium">
                  IBlog is a dynamic and user-friendly blogging platform built
                  using the MERN (MongoDB, Express, React, Node.js) stack.
                  <br /><br />
                  It is a space where ideas come to life and knowledge meets
                  creativity. Our mission is to share insightful content on
                  technology, personal experiences, and emerging trends across
                  various domains. We aim to inspire readers and foster a
                  community where thoughts, stories, and knowledge are
                  celebrated. Stay connected, learn, and grow with us! 🚀
                </p>
              </div>

              {/* About Me Card */}
              <div className="bg-white/80 backdrop-blur-md border border-slate-100 rounded-[2rem] shadow-sm p-8 md:p-10 transition-shadow duration-300 hover:shadow-md">
                <h2 className="font-extrabold text-3xl md:text-4xl mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight">
                  Who am I
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-slate-600 font-medium">
                  I'm a Full Stack Web Developer with a passion for building dynamic
                  and responsive web applications. I specialize in <span className="font-bold text-indigo-600">Front-End</span> technologies like HTML, CSS, JavaScript, and ReactJS, alongside <span className="font-bold text-indigo-600">Back-End</span> expertise in Node.js, Express.js, MongoDB, and Firebase.
                  <br /><br />
                  I'm comfortable working with modern frameworks and libraries like Tailwind CSS and Material-UI. I am dedicated to continuous learning and staying
                  up-to-date with the latest industry trends. Let's connect and
                  create innovative solutions together!
                </p>
              </div>

              {/* Connect Widget */}
              <div className="bg-slate-900 rounded-[2rem] shadow-lg p-8 md:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="font-extrabold text-2xl md:text-3xl text-white tracking-tight mb-2 text-center sm:text-left">
                    Let's Connect!
                  </h2>
                  <p className="text-slate-400 text-sm md:text-base text-center sm:text-left">
                    Find me on these platforms or drop me an email.
                  </p>
                </div>
                
                <div className="flex justify-center space-x-4 sm:space-x-6">
                  <a
                    href="https://github.com/Adarsh234"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-white/10 rounded-full text-white hover:bg-white hover:text-slate-900 hover:-translate-y-1 transition-all duration-300 shadow-sm"
                    title="Github"
                  >
                    <GrGithub className="text-2xl" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/adarsh-sharma-b45106308"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-white/10 rounded-full text-white hover:bg-[#0A66C2] hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm"
                    title="LinkedIn"
                  >
                    <FaLinkedinIn className="text-2xl" />
                  </a>
                  <a
                    href="mailto:adarsh0103sharma@gmail.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-white/10 rounded-full text-white hover:bg-[#EA4335] hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm"
                    title="Mail"
                  >
                    <IoMailOutline className="text-2xl" />
                  </a>
                  <a 
                    href="#" 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-3 bg-white/10 rounded-full text-white hover:bg-black hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm"
                    title="X (Twitter)"
                  >
                    <BsTwitterX className="text-2xl" />
                  </a>
                  <a
                    href="https://knowaboutadarsh.netlify.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-white/10 rounded-full text-white hover:bg-indigo-500 hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm"
                    title="Portfolio"
                  >
                    <TbWorld className="text-2xl" />
                  </a>
                </div>
              </div>

            </div>

            {/* RIGHT SIDE: MYSELF COMPONENT (Desktop) */}
            <div className="hidden lg:block lg:w-[400px] shrink-0 sticky top-24 h-fit">
              <Myself />
            </div>

          </div>
        </div>
      </div>
      <div className="mt-16 border-t border-slate-100 max-w-7xl mx-auto">
        <Footer />
      </div>
    </div>
  )
}

export default About