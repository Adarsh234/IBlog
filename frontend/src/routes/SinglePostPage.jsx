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
  // const [searchParams, setSearchParams] = useSearchParams()

  // const handleCategoryChange = (category) => {
  //   if (searchParams.get('cat') !== category) {
  //     setSearchParams({
  //       ...Object.fromEntries(searchParams.entries()),
  //       cat: category,
  //     })
  //   }
  // }

  const { isPending, error, data } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => fetchPost(slug),
  })

  if (isPending)
    return (
      <div className="flex flex-col gap-8 items-center mt-72">
        <TailSpin
          height="180"
          width="180"
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
  if (error) return 'Something went wrong!!!'
  if (!data) return 'Post Not Found!!!'

  console.log(data)
  return (
    <div className="flex flex-col gap-8">
      {/* Details */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8 mt-20">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
            {data.title}
          </h1>
          <div className="flex items-center gap-2 text-grey-400 text-sm">
            <span>Writen By</span>
            <Link className="text-blue-800">{data.user.username}</Link>
            <span>on</span>
            <Link className="text-blue-800">{data.category}</Link>
            <span>{format(data.createdAt)}</span>
          </div>
          <p className="text-gray-500 font-medium">{data.desc}</p>
        </div>
        {data.img && (
          <div className="hidden lg:block w-2/5">
            <Image src={data.img} w="400" className="rounded-2xl mt-12 ml-12" />
          </div>
        )}
      </div>
      {/* Content */}
      <div className="flex flex-col md:flex-row gap-12">
        {/* TEXT */}
        <div
          className="lg:text-lg flex flex-col gap-6 text-justify"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
        {/* MENU */}
        <div className="px-4 h-max sticky top-8">
          <h1 className=" mb-4 text-sm font-medium">Author</h1>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 ">
              <img
                src={
                  data.user.profile_img ||
                  'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png'
                }
                alt={`${data.user.username}'s profile`}
                className="w-12 h-12 rounded-full object-cover"
                w="48"
                h="48"
              />
              <Link className="text-blue-800">{data.user.username}</Link>
            </div>
            {/* <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet.</p> */}
            <div className="flex gap-2">
              <Link>
                <Image src="facebook.svg" />
              </Link>
              <Link>
                <Image src="instagram.svg" />
              </Link>
            </div>
          </div>

          <PostMenuAction post={data} />
          <h1 className="mt-8 mb-4 text-sm font-medium">Catagories</h1>
          <div className="flex flex-col gap-2 text-sm">
            <Link className="underline" to="/">
              All
            </Link>
            <Link className="underline" to="/posts?cat=web-design">
              Web Design
            </Link>
            <Link className="underline" to="/posts?cat=database">
              DataBase
            </Link>
            <Link className="underline" to="/posts?cat=development">
              Development
            </Link>
            <Link className="underline" to="/posts?cat=cyber-security">
              Cyber Security
            </Link>
            <Link className="underline" to="/posts?cat=seo">
              Search Engine
            </Link>
            <Link className="underline" to="/posts?cat=marketing">
              Marketing
            </Link>
          </div>
          <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
          <Search />
        </div>
      </div>
      <Comments postId={data._id} />
    </div>
  )
}

export default SinglePostPage