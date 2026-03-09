import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

const Search = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const query = e.target.value
      if (location.pathname === '/posts') {
        setSearchParams({ ...Object.fromEntries(searchParams), search: query })
      } else {
        navigate(`/posts?search=${query}`)
      }
    }
  }

  return (
    <div className="group bg-slate-50 hover:bg-slate-100 focus-within:bg-white p-2.5 px-4 rounded-full flex items-center gap-3 transition-all duration-300 ring-1 ring-transparent focus-within:ring-indigo-100 focus-within:shadow-[0_2px_10px_rgb(0,0,0,0.04)]">
      {/* SVG Icon: Inherits text color and transitions on focus */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-slate-400 group-focus-within:text-indigo-500 transition-colors duration-300"
      >
        <circle cx="10.5" cy="10.5" r="7.5" />
        <line x1="16.5" y1="16.5" x2="22" y2="22" />
      </svg>
      
      {/* Input: Removes default outline, adds a smooth width expansion when focused */}
      <input
        type="text"
        placeholder="Search a post..."
        className="bg-transparent focus:outline-none text-sm font-medium text-slate-700 placeholder:text-slate-400 w-32 md:w-40 xl:w-48 xl:focus:w-64 transition-all duration-300 ease-out"
        onKeyDown={handleKeyPress}
      />
    </div>
  )
}

export default Search