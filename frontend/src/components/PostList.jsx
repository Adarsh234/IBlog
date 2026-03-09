import PostListItem from './PostListItem'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSearchParams } from 'react-router-dom'
import { TailSpin } from 'react-loader-spinner'

const fetchPosts = async (pageParam, searchParams) => {
  const searchParamsObj = Object.fromEntries([...searchParams])

  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
    params: { page: pageParam, limit: 10, ...searchParamsObj },
  })
  return res.data
}

const PostList = () => {
  const [searchParams] = useSearchParams()

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    // isFetchingNextPage can be used for the bottom loader if needed
  } = useInfiniteQuery({
    queryKey: ['posts', searchParams.toString()],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, searchParams),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
    // FIX: Stop reloading on tab switch
    refetchOnWindowFocus: false, 
    // Optional: Keep data "fresh" longer to prevent unnecessary background fetching
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  // Polished initial loading state matching FeaturedPosts
  if (isFetching && !data)
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
          Loading the latest stories...
        </div>
      </div>
    )

  if (error) return (
    <div className="text-red-500 font-medium py-10 text-center">
      Unable to load posts: {error.message}
    </div>
  )

  const allPosts = data?.pages?.flatMap((page) => page.posts) || []

  return (
    <InfiniteScroll
      dataLength={allPosts.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      // Upgraded the inline loader for infinite scrolling
      loader={
        <div className="flex justify-center my-8">
          <TailSpin height="40" width="40" color="#4f46e5" ariaLabel="loading" />
        </div>
      }
      // Upgraded the end message
      endMessage={
        <p className="text-center text-slate-400 font-medium text-lg my-12 tracking-wide">
          You've reached the end! 🚀
        </p>
      }
      // Replaced the implicit block with a clean grid layout
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12 mt-8"
    >
      {allPosts.map((post) => (
        <PostListItem key={post._id} post={post} />
      ))}
    </InfiniteScroll>
  )
}

export default PostList