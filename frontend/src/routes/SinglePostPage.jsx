import Image from '../components/Image'
import { Link, useParams } from 'react-router-dom'
import PostMenuAction from '../components/PostMenuAction'
import Search from '../components/Search'
import Comments from '../components/Comments'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { TailSpin } from 'react-loader-spinner'
import { format } from 'timeago.js'

const fetchPost = async (slug) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`)
  return res.data
}

const SinglePostPage = () => {
  const { slug } = useParams()

  const { isPending, error, data } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => fetchPost(slug),
  })

  // Polished loading state matching the rest of the site
  if (isPending)
    return (
      <div className="flex flex-col gap-6 items-center justify-center min-h-[60vh]">
        <TailSpin
          height="80"
          width="80"
          color="#4f46e5"
          ariaLabel="tail-spin-loading"
          radius="1"
          visible={true}
        />
        <div className="text-lg font-medium text-slate-500 animate-pulse tracking-wide">
          Loading post...
        </div>
      </div>
    )

  if (error) return <div className="text-red-500 font-medium py-20 text-center text-xl">Something went wrong while loading the post.</div>
  if (!data) return <div className="text-slate-600 font-medium py-20 text-center text-xl">Post Not Found.</div>

  return (
    <div className="flex flex-col gap-12 mt-8 md:mt-12">
      
      {/* 1. HERO SECTION (Magazine Style) */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center bg-slate-50 p-8 md:p-12 lg:p-16 rounded-[2.5rem] relative overflow-hidden">
        
        {/* Optional decorative blur */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 -z-10"></div>

        <div className="flex-1 flex flex-col gap-6 lg:gap-8 z-10">
          
          {/* Meta Details Pills */}
          <div className="flex items-center flex-wrap gap-3 text-sm font-semibold">
            <Link 
              to={`/posts?cat=${data.category}`}
              className="px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-600 hover:text-white transition-colors shadow-sm"
            >
              {data.category}
            </Link>
            <span className="text-slate-400">•</span>
            <time className="text-slate-500">{format(data.createdAt)}</time>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
            {data.title}
          </h1>
          
          {/* Description / Subtitle */}
          <p className="text-lg md:text-xl text-slate-600 font-light leading-relaxed border-l-4 border-indigo-200 pl-4">
            {data.desc}
          </p>

          {/* Author Badge inline */}
          <div className="flex items-center gap-3 mt-4">
            <img
              src={data.user.profile_img || 'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png'}
              alt={`${data.user.username}'s profile`}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-md"
            />
            <div className="flex flex-col">
              <span className="text-xs text-slate-400 font-medium">Written by</span>
              <Link to={`/posts?author=${data.user.username}`} className="text-sm font-bold text-slate-800 hover:text-indigo-600 transition-colors">
                {data.user.username}
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        {data.img && (
          <div className="w-full lg:w-2/5 shrink-0 z-10">
            <Image 
              src={data.img} 
              className="rounded-3xl shadow-2xl object-cover w-full aspect-square md:aspect-auto md:h-[400px]" 
            />
          </div>
        )}
      </div>

      {/* 2. MAIN CONTENT LAYOUT */}
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative max-w-7xl mx-auto w-full">
        
        {/* LEFT: ARTICLE TEXT */}
        {/* We use prose to automatically style the raw HTML coming from your rich text editor */}
        <article
          className="lg:w-[70%] prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-indigo-600 hover:prose-a:text-indigo-800 prose-img:rounded-2xl prose-img:shadow-md leading-loose text-slate-700"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />

        {/* RIGHT: STICKY SIDEBAR */}
        <aside className="lg:w-[30%]">
          <div className="sticky top-24 flex flex-col gap-10">
            
            {/* Author Widget */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">About the Author</h3>
              <div className="flex items-center gap-4">
                <img
                  src={data.user.profile_img || 'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png'}
                  alt={data.user.username}
                  className="w-16 h-16 rounded-full object-cover shadow-sm"
                />
                <Link to={`/posts?author=${data.user.username}`} className="text-lg font-bold text-slate-800 hover:text-indigo-600">
                  {data.user.username}
                </Link>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                Developer, writer, and tech enthusiast sharing insights on modern web development.
              </p>
              <div className="flex gap-3 pt-2">
                <Link className="hover:-translate-y-1 transition-transform bg-slate-50 p-2 rounded-full"><Image src="facebook.svg" w="20" h="20"/></Link>
                <Link className="hover:-translate-y-1 transition-transform bg-slate-50 p-2 rounded-full"><Image src="instagram.svg" w="20" h="20"/></Link>
              </div>
            </div>

            {/* Actions Widget (Save/Like) */}
            <PostMenuAction post={data} />

            {/* Categories Widget */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Categories</h3>
              <div className="flex flex-wrap gap-2 text-sm font-medium">
                {['All', 'Web Design', 'Databases', 'Development', 'Cyber Security', 'Marketing'].map((cat) => (
                  <Link 
                    key={cat} 
                    to={`/posts?cat=${cat.toLowerCase().replace(' ', '-')}`}
                    className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-full hover:bg-indigo-50 hover:text-indigo-600 transition-colors border border-slate-100"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

            {/* Search Widget */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">Search Library</h3>
              <Search />
            </div>

          </div>
        </aside>
      </div>

      {/* 3. COMMENTS SECTION */}
      <div className="max-w-4xl mt-12 pt-12 border-t border-slate-100">
        <Comments postId={data._id} />
      </div>

    </div>
  )
}

export default SinglePostPage