import { Link } from 'react-router-dom'
import MainCategories from '../components/MainCategories'
import FeaturedPost from '../components/FeaturedPost'
import PostList from '../components/PostList'

const Homepage = () => {
  return (
    <div className="mt-8 flex flex-col gap-12 md:gap-16">
      
      {/* BREADCRUMBS: Upgraded to look like modern pills/badges */}
      <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
        <Link to="/" className="hover:text-indigo-600 transition-colors duration-300">
          Home
        </Link>
        <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
        <span className="text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 shadow-sm">
          Blogs & Articles
        </span>
      </div>

      {/* HERO SECTION */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative">
        
        {/* Optional: Subtle background glow for that modern web feel */}
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-30 -z-10"></div>

        {/* TITLES: Tighter tracking, gradient text highlight, improved line height */}
        <div className="flex-1">
          <h1 className="text-slate-900 text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
            Ignite Ideas, Share Stories,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
              Shape Perspectives.
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl font-light">
            Dive into a universe of ideas where creativity meets knowledge.
            Explore topics that inspire, stories that resonate, and solutions
            that drive innovation.
          </p>
        </div>

        {/* ANIMATED BUTTON: Group hover effects, standard tailwind slow spin */}
        <Link 
          to="write" 
          className="hidden md:flex relative items-center justify-center w-48 h-48 group shrink-0"
        >
          <svg
            viewBox="0 0 200 200"
            width="200"
            height="200"
            // Replaced custom class with Tailwind's arbitrary spin for a smooth 10s rotation
            className="text-lg tracking-widest text-slate-700 animate-[spin_10s_linear_infinite] group-hover:text-indigo-600 transition-colors duration-500"
          >
            <path
              id="circlePath"
              fill="none"
              d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            />
            <text>
              <textPath href="#circlePath" startOffset="0%">
                Write your story •
              </textPath>
              <textPath href="#circlePath" startOffset="50%">
                Share your idea •
              </textPath>
            </text>
          </svg>
          
          {/* Center Arrow Button */}
          <button
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 
            bg-indigo-600 rounded-full flex items-center justify-center shadow-lg 
            shadow-indigo-200 group-hover:scale-110 group-hover:bg-indigo-700 
            transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="32"
              height="32"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
            >
              <line x1="5" y1="19" x2="19" y2="5" />
              <polyline points="9 5 19 5 19 15" />
            </svg>
          </button>
        </Link>
      </div>

      {/* CATEGORIES */}
      <MainCategories />

      {/* FEATURED POSTS */}
      <FeaturedPost />

      {/* POST LIST: Cleaned up the heading */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
            Recent Posts
          </h2>
        </div>
        <PostList />
      </div>
    </div>
  )
}

export default Homepage