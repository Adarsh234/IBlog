import Navbar from './components/Navbar'

const App = () => {
  return (
    /* 1. min-h-screen: Ensures the background covers the whole page even if content is short.
      2. Background: Subtle indigo-to-white radial gradient for a premium feel.
      3. xl:px-32: Fixed the 'lx' typo from your original code.
    */
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50/50 via-white to-white px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 transition-colors duration-500">
      <Navbar />
      
      {/* If you are using this as a wrapper for your entire app, 
         ensure your main content or <Outlet /> follows the Navbar.
      */}
      <main className="py-4">
        {/* Your Page Content Goes Here */}
      </main>
    </div>
  )
}

export default App