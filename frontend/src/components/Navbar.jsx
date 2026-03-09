import { useEffect, useState } from 'react'
import Image from './Image'
import { Link, useLocation } from 'react-router-dom'
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const location = useLocation() // Optional: Useful if you want to highlight active links later

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <div className="w-full h-20 md:h-24 flex items-center justify-between bg-transparent transition-all duration-300">
      
      {/* LOGO AREA */}
      <Link 
        to="/" 
        className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-slate-900 group"
      >
        {/* Added a subtle scale effect to the logo on hover */}
        <div className="group-hover:scale-105 transition-transform duration-300">
          <Image src="logo.png" alt="IBlog Logo" w={36} h={36} />
        </div>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
          IBlog
        </span>
      </Link>

      {/* MOBILE MENU */}
      <div className="md:hidden z-50">
        {/* MOBILE HAMBURGER BUTTON */}
        <div
          className="cursor-pointer flex flex-col gap-[6px] p-2 relative z-50"
          onClick={() => setOpen((prev) => !prev)}
        >
          <div
            className={`h-[2px] rounded-full w-6 bg-slate-800 origin-left transition-all duration-300 ease-in-out ${
              open ? 'rotate-45 translate-x-[2px]' : ''
            }`}
          ></div>
          <div
            className={`h-[2px] rounded-full w-6 bg-slate-800 transition-all duration-300 ease-in-out ${
              open ? 'opacity-0 translate-x-4' : ''
            }`}
          ></div>
          <div
            className={`h-[2px] rounded-full w-6 bg-slate-800 origin-left transition-all duration-300 ease-in-out ${
              open ? '-rotate-45 translate-x-[2px]' : ''
            }`}
          ></div>
        </div>

        {/* MOBILE LINK LIST OVERLAY */}
        {/* Upgraded background color and added a blur effect (backdrop-blur) */}
        <div
          className={`fixed inset-0 w-screen h-screen bg-slate-50/95 backdrop-blur-md flex flex-col items-center justify-center gap-10 font-bold text-2xl transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ zIndex: 40 }}
        >
          <Link to="/" onClick={() => setOpen(false)} className="text-slate-800 hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <Link to="/posts?sort=trending" onClick={() => setOpen(false)} className="text-slate-800 hover:text-indigo-600 transition-colors">
            Trending
          </Link>
          <Link to="/posts?sort=popular" onClick={() => setOpen(false)} className="text-slate-800 hover:text-indigo-600 transition-colors">
            Most Popular
          </Link>
          <Link to="/about" onClick={() => setOpen(false)} className="text-slate-800 hover:text-indigo-600 transition-colors">
            About
          </Link>
          
          <div className="mt-4" onClick={() => setOpen(false)}>
            <SignedOut>
              <Link to="/login">
                <button className="py-3 px-8 rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-200 active:scale-95 transition-all">
                  Login 👋
                </button>
              </Link>
            </SignedOut>
            <SignedIn>
              <div className="scale-125">
                <UserButton />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-8 xl:gap-10 font-semibold text-sm text-slate-600">
        {/* Added smooth hover colors to desktop links */}
        <Link to="/" className="hover:text-indigo-600 transition-colors duration-200">
          Home
        </Link>
        <Link to="/posts?sort=trending" className="hover:text-indigo-600 transition-colors duration-200">
          Trending
        </Link>
        <Link to="/posts?sort=popular" className="hover:text-indigo-600 transition-colors duration-200">
          Most Popular
        </Link>
        <Link to="/about" className="hover:text-indigo-600 transition-colors duration-200">
          About
        </Link>
        
        <div className="ml-4 flex items-center">
          <SignedOut>
            <Link to="/login">
              {/* Upgraded Button: Gradient, shadow, and hover scaling */}
              <button className="py-2.5 px-6 rounded-full bg-slate-900 text-white hover:bg-indigo-600 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ease-out font-medium tracking-wide">
                Login 👋
              </button>
            </Link>
          </SignedOut>
          <SignedIn>
            {/* Added a subtle ring/border effect around the user avatar */}
            <div className="ring-2 ring-slate-100 rounded-full hover:ring-indigo-100 transition-all p-0.5 cursor-pointer">
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>

    </div>
  )
}

export default Navbar