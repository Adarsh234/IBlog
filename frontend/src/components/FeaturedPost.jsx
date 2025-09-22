import { Link } from 'react-router-dom'
import Image from './Image'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { format } from 'timeago.js'
import { TailSpin } from 'react-loader-spinner'

const fetchFeaturedPosts = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/posts`,
    {
      params: { featured: true, limit: 4, sort: 'newest' },
      withCredentials: true, // if using cookies or auth
    }
  )
  return res.data
}

const FeaturedPosts = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['featuredPosts'],
    queryFn: fetchFeaturedPosts,
  })

  if (isLoading)
    return (
      <div className="flex flex-col gap-8 items-center mt-12">
        <TailSpin
          height="160"
          width="160"
          color="#3f66dd"
          ariaLabel="tail-spin-loading"
          radius="1"
          visible={true}
        />
        <div className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
          Loading.....
        </div>
      </div>
    )

  if (error) return <div>Something went wrong! {error.message}</div>

  const posts = data.posts
  if (!posts || posts.length === 0) return null

  return (
    <div className="mt-8 flex flex-col lg:flex-row gap-8">
      {/* First post */}
      {posts[0] && (
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          {posts[0].img && (
            <Image src={posts[0].img} className="rounded-3xl object-cover" w="895" />
          )}
          <div className="flex items-center gap-4">
            <h1 className="font-semibold lg:text-lg">01.</h1>
            <Link className="text-blue-800 lg:text-lg">{posts[0].category}</Link>
            <span className="text-gray-500">{format(posts[0].createdAt)}</span>
          </div>
          <Link
            to={posts[0].slug}
            className="text-3xl lg:text-3xl font-semibold lg:font-bold"
          >
            {posts[0].title}
          </Link>
        </div>
      )}
      {/* Other posts */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {posts.slice(1).map((post, index) => (
          <div key={post._id} className="lg:h-1/3 flex justify-between gap-4">
            {post.img && (
              <div className="w-1/3 aspect-video">
                <Image src={post.img} className="rounded-3xl object-cover w-full h-full" w="298" />
              </div>
            )}
            <div className="w-2/3">
              <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
                <h1 className="font-semibold">{index + 2}.</h1>
                <Link className="text-blue-800">{post.category}</Link>
                <span className="text-gray-500 text-sm">{format(post.createdAt)}</span>
              </div>
              <Link
                to={post.slug}
                className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
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
