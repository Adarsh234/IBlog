import { Link } from 'react-router-dom'
import Image from './Image'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { format } from 'timeago.js'
import { TailSpin } from 'react-loader-spinner'

const fetchPost = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/posts?featured=true&limit=4&sort=newest`
  )
  return res.data
}

const FeaturedPosts = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['featuredPosts'],
    queryFn: () => fetchPost(),
  })

  // Upgraded Loading State: Sleeker spinner color and text animation
  if (isPending)
    return (
      <div className="flex flex-col gap-6 items-center justify-center my-20">
        <TailSpin
          height="80"
          width="80"
          color="#4f46e5" // Tailwind indigo-600
          ariaLabel="tail-spin-loading"
          radius="1"
          visible={true}
        />
        <div className="text-lg font-medium text-slate-500 animate-pulse tracking-wide">
          Fetching featured stories...
        </div>
      </div>
    )

  if (error) return <div className="text-red-500 font-medium">Something went wrong: {error.message}</div>

  const posts = data.posts
  if (!posts || posts.length === 0) {
    return null
  }

  // The main featured post
  const mainPost = posts[0]
  // The remaining 3 smaller posts
  const subPosts = posts.slice(1, 4)

  return (
    <div className="mt-8 flex flex-col lg:flex-row gap-8 xl:gap-12">
      
      {/* LEFT: MAIN FEATURED POST */}
      <div className="w-full lg:w-1/2 flex flex-col gap-5 group">
        {/* Image with zoom-on-hover effect */}
        {mainPost.img && (
          <Link to={`/${mainPost.slug}`} className="overflow-hidden rounded-3xl shadow-sm">
            <Image
              src={mainPost.img}
              className="rounded-3xl object-cover w-full transform transition-transform duration-700 ease-out group-hover:scale-105"
              w="895"
            />
          </Link>
        )}
        
        {/* Meta Details */}
        <div className="flex items-center gap-4 text-sm font-semibold">
          <span className="text-slate-300 text-3xl font-black tracking-tighter">01</span>
          <Link className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors duration-200">
            {mainPost.category}
          </Link>
          <span className="text-slate-400 font-medium">{format(mainPost.createdAt)}</span>
        </div>
        
        {/* Title */}
        <Link
          to={`/${mainPost.slug}`}
          className="text-3xl lg:text-4xl xl:text-5xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors duration-300 leading-[1.2] tracking-tight"
        >
          {mainPost.title}
        </Link>
      </div>

      {/* RIGHT: SUB FEATURED POSTS */}
      <div className="w-full lg:w-1/2 flex flex-col gap-8 justify-between">
        {subPosts.map((post, index) => (
          <div key={post._id || index} className="flex gap-6 group items-center">
            
            {/* Sub Post Image */}
            {post.img && (
              <Link to={`/${post.slug}`} className="w-1/3 aspect-video overflow-hidden rounded-2xl shadow-sm shrink-0">
                <Image
                  src={post.img}
                  className="rounded-2xl object-cover w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-105"
                  w="298"
                />
              </Link>
            )}
            
            {/* Sub Post Details */}
            <div className="w-2/3 flex flex-col gap-2.5">
              <div className="flex items-center gap-3 text-xs lg:text-sm font-semibold">
                {/* Dynamically assign 02, 03, 04 */}
                <span className="text-slate-300 text-2xl font-black tracking-tighter">
                  0{index + 2}
                </span>
                <Link className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
                  {post.category}
                </Link>
                <span className="text-slate-400 font-medium">
                  {format(post.createdAt)}
                </span>
              </div>
              
              {/* Sub Post Title */}
              <Link
                to={`/${post.slug}`}
                className="text-lg md:text-xl lg:text-xl xl:text-2xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2 leading-snug"
              >
                {post.title}
              </Link>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeaturedPosts