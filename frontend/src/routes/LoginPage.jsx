import { SignIn } from '@clerk/clerk-react'

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] relative overflow-hidden px-4">
      
      {/* BACKGROUND DECORATION: Matches the subtle glow from your Homepage/SinglePostPage */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-200/30 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 -z-10"></div>
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-cyan-100/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-50 -z-10"></div>

      {/* LOGIN CONTAINER: Frosted glass effect around the Clerk component */}
      <div className="p-8 md:p-12 bg-white/40 backdrop-blur-xl border border-white/60 rounded-[3rem] shadow-2xl shadow-indigo-100/50">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            Welcome Back
          </h1>
          <p className="text-slate-500 font-medium text-sm">
            Log in to continue your journey with <span className="text-indigo-600 font-bold">IBlog</span>
          </p>
        </div>

        {/* CLERK COMPONENT */}
        <SignIn 
          signUpUrl="/register" 
          appearance={{
            elements: {
              formButtonPrimary: 
                "bg-indigo-600 hover:bg-indigo-700 text-sm normal-case shadow-none transition-all",
              card: "shadow-none border-none bg-transparent",
              headerTitle: "hidden", // We used our own custom title above
              headerSubtitle: "hidden",
              socialButtonsBlockButton: "border-slate-200 hover:bg-slate-50 transition-all",
              footerActionLink: "text-indigo-600 hover:text-indigo-800 font-bold",
            }
          }}
        />
      </div>
    </div>
  )
}

export default LoginPage