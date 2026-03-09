import { Link } from 'react-router-dom'
import Search from './Search'

const MainCategories = () => {
  return (
    <div
      // Upgraded the container to a sleek, floating pill with a soft ring and custom shadow
      className="hidden md:flex bg-white rounded-3xl xl:rounded-full p-2 pl-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] ring-1 ring-slate-100 items-center justify-between gap-6"
    >
      {/* LINKS */}
      {/* Centralized the text styling for all inactive links */}
      <div className="flex-1 flex items-center justify-between flex-wrap text-sm font-semibold text-slate-500">
        
        {/* Active Tab: Matches the Navbar "Login" button aesthetic */}
        <Link
          to="/posts"
          className="bg-slate-900 text-white rounded-full px-6 py-2.5 shadow-md hover:bg-slate-800 hover:-translate-y-0.5 transition-all duration-300 tracking-wide"
        >
          All Posts
        </Link>
        
        {/* Category Tabs: Added soft indigo hover states */}
        <Link
          to="/posts?cat=web-design"
          className="hover:bg-indigo-50 hover:text-indigo-600 rounded-full px-4 py-2 transition-all duration-200"
        >
          Web Design
        </Link>
        <Link
          to="/posts?cat=database"
          className="hover:bg-indigo-50 hover:text-indigo-600 rounded-full px-4 py-2 transition-all duration-200"
        >
          Databases
        </Link>
        <Link
          to="/posts?cat=development"
          className="hover:bg-indigo-50 hover:text-indigo-600 rounded-full px-4 py-2 transition-all duration-200"
        >
          Development
        </Link>
        <Link
          to="/posts?cat=cyber-security"
          className="hover:bg-indigo-50 hover:text-indigo-600 rounded-full px-4 py-2 transition-all duration-200"
        >
          Cyber Security
        </Link>
        <Link
          to="/posts?cat=marketing"
          className="hover:bg-indigo-50 hover:text-indigo-600 rounded-full px-4 py-2 transition-all duration-200"
        >
          Marketing
        </Link>
        <Link
          to="/posts?cat=seo"
          className="hover:bg-indigo-50 hover:text-indigo-600 rounded-full px-4 py-2 transition-all duration-200"
        >
          Search Engines
        </Link>
      </div>

      {/* SEPARATOR: Replaced the text "|" with a sleek graphical divider */}
      <div className="w-[1px] h-8 bg-slate-200 rounded-full"></div>

      {/* SEARCH */}
      <div className="pr-2">
        <Search />
      </div>
    </div>
  )
}

export default MainCategories