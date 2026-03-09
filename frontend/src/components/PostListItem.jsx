import { Link } from 'react-router-dom'
import Image from './Image'
import { format } from 'timeago.js'

const PostListItem = ({ post }) => {
  return (
    <article className="group flex flex-col bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 overflow-hidden h-full">
      
      {/* 1. IMAGE CONTAINER */}
      {post.img && (
        <div className="w-full aspect-[16/10] overflow-hidden relative shrink-0">
          <Link to={`/${post.slug}`}>
            <Image 
              src={post.img} 
              className="object-cover w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-105" 
              w="735" 
            />
          </Link>
          
          {/* Floating Category Pill */}
          <Link 
            to={`/posts?cat=${post.category}`}
            className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-indigo-600 shadow-sm hover:bg-indigo-600 hover:text-white transition-colors duration-200 z-10"
          >
            {post.category}
          </Link>
        </div>
      )}

      {/* 2. CONTENT CONTAINER */}
      {/* flex-1 ensures the card body stretches, pushing the "Read More" button to the bottom even if descriptions are different lengths */}
      <div className="flex flex-col flex-1 p-6 pt-5">
        
        {/* Meta Details */}
        <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-xs font-medium text-slate-500 mb-3">
          <span>By</span>
          <Link
            className="text-slate-800 font-semibold hover:text-indigo-600 transition-colors"
            to={`/posts?author=${post.user?.username || 'unknown'}`}
          >
            {post.user?.username || 'Unknown'}
          </Link>
          <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
          <time>{format(post.createdAt)}</time>
        </div>

        {/* Title */}
        <Link to={`/${post.slug}`}>
          <h3 className="text-xl lg:text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-300 leading-snug mb-3 line-clamp-2">
            {post.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {post.desc}
        </p>

        {/* Action Link (mt-auto pushes it to the bottom of the card) */}
        <Link 
          to={`/${post.slug}`} 
          className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors mt-auto w-fit"
        >
          Read More
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor" 
            className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
          >
            <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
      
    </article>
  )
}

export default PostListItem