import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    /* 1. min-h-screen ensures the background covers the full page.
      2. Added a very subtle lavender-to-white gradient to match your 'Write' page aesthetic.
      3. Maintained your responsive horizontal padding.
    */
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50/50 via-white to-white px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 transition-colors duration-500">
      
      {/* NAVBAR: Fixed height is handled inside the Navbar component */}
      <Navbar />
      
      {/* MAIN CONTENT: Added a top margin to separate content from the Navbar */}
      <main className="py-4">
        <Outlet />
      </main>

    </div>
  )
}

export default MainLayout