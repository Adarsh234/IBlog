import { SignUp } from "@clerk/clerk-react"

const Register = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] relative overflow-hidden px-4">
      
      {/* BACKGROUND DECORATION: Matching the LoginPage for consistency */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-200/30 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 -z-10"></div>
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-cyan-100/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-50 -z-10"></div>

      {/* SIGNUP CONTAINER: Glassmorphism effect */}
      <div className="p-8 md:p-12 bg-white/40 backdrop-blur-xl border border-white/60 rounded-[3.5rem] shadow-2xl shadow-indigo-100/50 my-10">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            Join the Community
          </h1>
          <p className="text-slate-500 font-medium text-sm text-center">
            Create an account to start sharing your stories on <span className="text-indigo-600 font-bold">IBlog</span>
          </p>
        </div>

        {/* CLERK SIGNUP COMPONENT */}
        <SignUp 
          signInUrl="/login" 
          appearance={{
            elements: {
              formButtonPrimary: 
                "bg-indigo-600 hover:bg-indigo-700 text-sm normal-case shadow-none transition-all duration-300 py-3",
              card: "shadow-none border-none bg-transparent",
              headerTitle: "hidden", // Using our custom header above
              headerSubtitle: "hidden",
              socialButtonsBlockButton: "border-slate-200 hover:bg-slate-50 transition-all rounded-xl",
              footerActionLink: "text-indigo-600 hover:text-indigo-800 font-bold",
              formFieldInput: "rounded-xl border-slate-200 focus:ring-indigo-500 focus:border-indigo-500",
            }
          }}
        />
      </div>
    </div>
  )
}

export default Register