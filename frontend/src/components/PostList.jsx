import PostListItem from './PostListItem'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSearchParams } from 'react-router-dom'
import { TailSpin } from 'react-loader-spinner'

// Backend API base URL from environment
const API_URL = import.meta.env.VITE_API_URL

const fetchPosts = async (pageParam, searchParams) => {
  const searchParamsObj = Object.fromEntries([...searchParams])

  try {
    const res = await axios.get(`${API_URL}/posts`, {
      params: { page: pageParam, limit: 10, ...searchParamsObj },
      withCredentials: true, // needed if backend uses cookies or auth
    })
    return res.data
  } catch (err) {
    console.error('Error fetching posts:', err)
    throw err
  }
}

const PostList = () => {
  const [searchParams] = useSearchParams()

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts', searchParams.toString()],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, searchParams),
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  })

  if (isFetching)
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

  if (error)
    return (
      <div className="text-center mt-12 text-red-600 font-semibold">
        Something went wrong! Please try again later.
      </div>
    )

  const allPosts = data?.pages?.flatMap((page) => page.posts) || []

  return (
    <InfiniteScroll
      dataLength={allPosts.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h4 className="text-center my-4">Loading more posts...</h4>}
      endMessage={
        <p className="text-center font-light text-xl my-6 font-serif">
          <b>All posts loaded!</b>
        </p>
      }
    >
      {allPosts.map((post) => (
        <PostListItem key={post._id} post={post} />
      ))}
    </InfiniteScroll>
  )
}

export default PostList
