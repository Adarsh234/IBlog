import { useSearchParams } from 'react-router-dom'
import Search from './Search'

const SideMenu = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  
  // Get the current active filters to apply styling to the active category
  const activeSort = searchParams.get('sort') || 'newest'
  const activeCat = searchParams.get('cat') || 'general'

  const handleFilterChange = (e) => {
    if (searchParams.get('sort') !== e.target.value) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        sort: e.target.value,
      })
    }
  }

  const handleCategoryChange = (category) => {
    if (searchParams.get('cat') !== category) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        cat: category,
      })
    }
  }

  // Helper arrays to keep the JSX clean
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'trending', label: 'Trending Now' },
    { value: 'oldest', label: 'Oldest First' },
  ]

  const categoryOptions = [
    { value: 'general', label: 'All Topics' },
    { value: 'web-design', label: 'Web Design' },
    { value: 'development', label: 'Development' },
    { value: 'databases', label: 'Databases' },
    { value: 'seo', label: 'Search Engines' },
    { value: 'cyber-security', label: 'Cyber Security' },
    { value: 'marketing', label: 'Marketing' },
  ]

  return (
    <div className="flex flex-col gap-6 sticky top-24 pb-8">
      
      {/* SEARCH WIDGET */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Search Library</h3>
        <Search />
      </div>

      {/* FILTER WIDGET */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sort By</h3>
        
        <div className="flex flex-col gap-3 text-sm">
          {sortOptions.map((option) => (
            <label 
              key={option.value} 
              className="flex items-center gap-3 cursor-pointer group p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <div className="relative flex items-center justify-center">
                <input
                  type="radio"
                  name="sort"
                  value={option.value}
                  onChange={handleFilterChange}
                  checked={activeSort === option.value}
                  // Hide the default radio completely
                  className="peer sr-only"
                />
                {/* Custom outer ring */}
                <div className="w-5 h-5 border-2 border-slate-300 rounded-full peer-checked:border-indigo-600 transition-colors"></div>
                {/* Custom inner dot (appears only when checked) */}
                <div className="absolute w-2.5 h-2.5 bg-indigo-600 rounded-full opacity-0 scale-50 peer-checked:opacity-100 peer-checked:scale-100 transition-all duration-200"></div>
              </div>
              <span className={`font-medium transition-colors ${activeSort === option.value ? 'text-indigo-900' : 'text-slate-600 group-hover:text-slate-900'}`}>
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* CATEGORY WIDGET */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Categories</h3>
        
        <div className="flex flex-wrap gap-2 text-sm">
          {categoryOptions.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryChange(cat.value)}
              // Dynamic styling based on whether this category is active
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 shadow-sm ${
                activeCat === cat.value
                  ? 'bg-slate-900 text-white shadow-md hover:-translate-y-0.5' // Active State
                  : 'bg-slate-50 text-slate-600 border border-slate-100 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100' // Inactive State
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

    </div>
  )
}

export default SideMenu