import { useState } from 'react'
import PostList from '../components/PostList'
import SideMenu from '../components/SideMenu'

const PostListPage = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="mt-8">
      
      {/* PAGE HEADER: Added a modern gradient title and a soft subtitle */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Explore{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
            Our Library
          </span>
        </h1>
        <p className="text-lg text-slate-600 font-light max-w-2xl">
          Discover insights, tutorials, and stories from the world of software development and design.
        </p>
      </div>

      {/* MOBILE FILTER BUTTON: Upgraded from a blocky blue button to a sleek, interactive pill */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="md:hidden flex items-center justify-center gap-2 w-full sm:w-auto bg-indigo-50 text-indigo-700 border border-indigo-100 px-6 py-3 rounded-full font-semibold shadow-sm hover:bg-indigo-600 hover:text-white transition-all duration-300 mb-8 active:scale-95"
      >
        {open ? 'Hide Filters' : 'Filter & Search'}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {/* MAIN LAYOUT: Fixed the <dvi> typo and strictly defined column widths */}
      <div className="flex flex-col-reverse md:flex-row gap-10 xl:gap-16">
        
        {/* POST LIST CONTAINER: Takes up 70-75% of the screen */}
        <div className="w-full md:w-[65%] lg:w-[75%]">
          <PostList />
        </div>
        
        {/* SIDE MENU CONTAINER: Takes up the remaining 25-35% and adds a sleek divider line on large screens */}
        <div className={`${open ? 'block' : 'hidden'} md:block w-full md:w-[35%] lg:w-[25%] md:border-l md:border-slate-100 md:pl-8 lg:pl-10 xl:pl-12`}>
          <SideMenu />
        </div>

      </div>
    </div>
  )
}

export default PostListPage