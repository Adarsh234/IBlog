import React from 'react'
import { TbWorld } from 'react-icons/tb'

function Myself() {
  return (
    // Replaced custom CSS classes with pure Tailwind for a sleek, frosted-glass card
    <div className="flex flex-col items-center bg-white/80 backdrop-blur-md border border-slate-100 rounded-[2rem] shadow-sm p-8 md:p-10 text-center transition-shadow duration-300 hover:shadow-md">
      
      {/* Profile Image with a clean white border and shadow for depth */}
      <div className="relative mb-6 group">
        <img
          src="https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere-thumbnail.png"
          alt="Adarsh Sharma Profile"
          className="w-32 h-32 rounded-full object-cover ring-4 ring-white shadow-lg group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Name & Title Hierarchy */}
      <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight mb-1">
        Adarsh Sharma
      </h2>
      <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-6">
        MERN Stack Developer
      </p>

      {/* Bio */}
      <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8 font-medium">
        Hi, I'm Adarsh, a passionate and dedicated developer with a strong foundation in building dynamic and responsive web applications. With a background in software engineering, I've honed my skills in MongoDB, Express.js, React.js, and Node.js to deliver seamless, full-stack solutions that meet modern web development standards.
      </p>

      {/* Upgraded Portfolio Button */}
      <a
        href="https://knowaboutadarsh.netlify.app/"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-slate-900 text-white font-semibold rounded-full shadow-md hover:bg-indigo-600 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 w-full"
      >
        <TbWorld className="text-xl" />
        Visit Portfolio
      </a>
      
    </div>
  )
}

export default Myself