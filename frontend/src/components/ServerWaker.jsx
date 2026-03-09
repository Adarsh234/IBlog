import { useState, useEffect } from 'react'

const ServerWaker = ({ children }) => {
  const [isAwake, setIsAwake] = useState(false)

  useEffect(() => {
    const pingServer = async () => {
      try {
        // Ping the backend to wake up the Render free tier service
        await fetch(`${import.meta.env.VITE_API_URL}/posts`)
        setIsAwake(true)
      } catch (error) {
        // Retry every 3 seconds until the server responds
        setTimeout(pingServer, 3000)
      }
    }

    pingServer()
  }, [])

  if (!isAwake) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-white to-white">
        
        {/* Animated Loading Graphic */}
        <div className="relative mb-8">
          {/* Decorative outer glow */}
          <div className="absolute inset-0 bg-indigo-200 rounded-full blur-2xl opacity-40 animate-pulse"></div>
          
          {/* Main Spinner */}
          <div className="relative w-16 h-16 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>

        {/* Messaging Hierarchy */}
        <div className="max-w-md flex flex-col items-center gap-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight animate-pulse">
            Waking up the engine
          </h1>
          
          <div className="h-1 w-20 bg-indigo-600 rounded-full mb-2"></div>

          <p className="text-slate-600 font-medium leading-relaxed">
            Our server is currently spinning up from its sleep cycle. 
            This usually takes about <span className="text-indigo-600 font-bold">30–50 seconds</span> on our free hosting tier. 
          </p>
          
          <p className="text-sm text-slate-400 font-semibold italic">
            Thank you for your patience while we get things ready!
          </p>
        </div>

        {/* Subtle Footer Info */}
        <div className="absolute bottom-10 flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-[0.2em]">
          <span>Powered by</span>
          <span className="text-slate-400">Render</span>
          <span>&</span>
          <span className="text-slate-400">MERN</span>
        </div>
      </div>
    )
  }

  return children
}

export default ServerWaker