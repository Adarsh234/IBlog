import React from 'react'
import { TbWorld } from 'react-icons/tb'
function Myself() {
  return (
    <div className="outer my-4">
      <section className="myself-container max-md:mt-0 max-md:w-11/12  mt-30 w-4/5 bg-blue-200 backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <img
          src="https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere-thumbnail.png"
          alt="Adarsh"
          className={`my-pic`}
        />
        <h2 className={`name `}>Adarsh Sharma</h2>
        <p className={`about-me `}>
          Hi, I'm Adarsh Sharma, a passionate and dedicated MERN Stack Developer
          with a strong foundation in building dynamic and responsive web
          applications. With a background in software engineering, I've honed my
          skills in MongoDB, Express.js, React.js, and Node.js to deliver
          seamless, full-stack solutions that meet modern web development
          standards.
        </p>
        <br />
        <a
          href="https://knowaboutadarsh.netlify.app/"
          target="_blank"
          className="text-lightBlue text-xl justify-center gap-1 flex items-center"
        >
          Portfilio -<TbWorld />
        </a>
      </section>
    </div>
  )
}
export default Myself