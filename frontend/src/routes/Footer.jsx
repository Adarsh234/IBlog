import React from 'react'
import { GrGithub } from 'react-icons/gr'
import { IoMailOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { FaLinkedinIn } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="mt-20 pb-10">
      {/* Sleeker Divider */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-16"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-8 mb-16">
          
          {/* BRAND SECTION */}
          <div className="flex flex-col items-center lg:items-start max-w-sm mx-auto lg:mx-0 text-center lg:text-left">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="text-4xl font-black text-indigo-600 tracking-tighter group-hover:scale-110 transition-transform">
                I
              </span>
              <span className="text-3xl font-light text-slate-800 tracking-tight">Blog</span>
            </Link>
            <p className="mt-6 text-slate-500 leading-relaxed font-medium">
              Unleashing Ideas, Sharing Stories, and Inspiring Minds in the
              Digital World. Join our community of creative thinkers.
            </p>
          </div>

          {/* LINKS GRID */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-12 sm:gap-24 w-full lg:w-auto">
            
            {/* USEFUL LINKS */}
            <div className="flex flex-col items-center lg:items-start">
              <p className="font-bold text-slate-800 mb-6 uppercase tracking-widest text-xs">Useful Links</p>
              <nav className="flex flex-col gap-4 text-slate-500 font-semibold text-sm">
                <Link className="hover:text-indigo-600 transition-colors" to="/about">About Us</Link>
                <Link className="hover:text-indigo-600 transition-colors" to="/posts">All Blogs</Link>
                <Link className="hover:text-indigo-600 transition-colors" to="/write">Create Post</Link>
                <Link className="hover:text-indigo-600 transition-colors" to="/trending">Trending</Link>
              </nav>
            </div>

            {/* CONTACT INFO */}
            <div className="flex flex-col items-center lg:items-start">
              <p className="font-bold text-slate-800 mb-6 uppercase tracking-widest text-xs">Connect</p>
              <nav className="flex flex-col gap-4 text-slate-500 font-semibold text-sm">
                <a className="hover:text-indigo-600 transition-colors truncate max-w-[180px]" href="mailto:adarsh0103sharma@gmail.com">
                  Email Me
                </a>
                <a className="hover:text-indigo-600 transition-colors" href="https://www.linkedin.com/in/adarsh-sharma-b45106308" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <a className="hover:text-indigo-600 transition-colors" href="https://github.com/Adarsh234" target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </nav>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR: Socials & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-100 gap-6">
          
          {/* Social Icons with brand-specific hover states */}
          <div className="flex gap-4">
            <a 
              href="mailto:adarsh0103sharma@gmail.com" 
              className="p-2.5 bg-slate-50 text-slate-400 rounded-full hover:bg-red-50 hover:text-red-500 transition-all shadow-sm"
              title="Email"
            >
              <IoMailOutline className="text-xl" />
            </a>
            <a 
              href="https://github.com/Adarsh234" 
              className="p-2.5 bg-slate-50 text-slate-400 rounded-full hover:bg-slate-900 hover:text-white transition-all shadow-sm"
              title="GitHub"
            >
              <GrGithub className="text-xl" />
            </a>
            <a 
              href="https://www.linkedin.com/in/adarsh-sharma-b45106308" 
              className="p-2.5 bg-slate-50 text-slate-400 rounded-full hover:bg-[#0A66C2] hover:text-white transition-all shadow-sm"
              title="LinkedIn"
            >
              <FaLinkedinIn className="text-xl" />
            </a>
          </div>

          <p className="text-slate-400 text-sm font-medium">
            &copy; {new Date().getFullYear()} IBlog. All Rights Reserved. Crafted by <span className="text-slate-900 font-bold">Adarsh Sharma</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer