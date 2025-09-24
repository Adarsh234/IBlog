import PostListItem from './PostListItem'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSearchParams } from 'react-router-dom'
import { TailSpin } from 'react-loader-spinner'

const fetchPosts = async (pageParam, searchParams) => {
  const searchParamsObj = Object.fromEntries([...searchParams])

  // console.log(searchParamsObj)

  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
    params: { page: pageParam, limit: 10, ...searchParamsObj },
  })
  return res.data
}

const PostList = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['posts', searchParams.toString()],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, searchParams),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  })

  // if (status === "loading") return "Loading...";
  if (isFetching)
    return (
      <div className="flex flex-col gap-8 items-center mt-12">
        <TailSpin
          height="160"
          width="160"
          color="#3f66dd"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
        <div className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
          Loading.....
        </div>
      </div>
    )

  // if (status === "error") return "Something went wrong!";
  if (error) return 'Something went wrong!'

  const allPosts = data?.pages?.flatMap((page) => page.posts) || []

  return (
    <InfiniteScroll
      dataLength={allPosts.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h4>Loading more posts...</h4>}
      endMessage={
        <p className="text-center font-light-600 text-3xl mb-6 font-serif">
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