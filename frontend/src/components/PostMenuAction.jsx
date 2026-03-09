import { useUser, useAuth } from '@clerk/clerk-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { TailSpin } from 'react-loader-spinner'

const PostMenuActions = ({ post }) => {
  const { user } = useUser()
  const { getToken } = useAuth()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {
    isPending,
    error,
    data: savedPosts,
  } = useQuery({
    queryKey: ['savedPosts'],
    queryFn: async () => {
      const token = await getToken()
      return axios.get(`${import.meta.env.VITE_API_URL}/users/saved`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
    enabled: !!user, // Only fetch if user is logged in
  })

  const isAdmin = user?.publicMetadata?.role === 'admin' || false
  const isSaved = savedPosts?.data?.some((p) => p === post._id) || false

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken()
      return axios.delete(`${import.meta.env.VITE_API_URL}/posts/${post._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
    },
    onSuccess: () => {
      toast.success('Post deleted successfully!')
      navigate('/')
    },
    onError: (err) => toast.error(err.response?.data || "Failed to delete post"),
  })

  const saveMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken()
      return axios.patch(`${import.meta.env.VITE_API_URL}/users/save`, 
        { postId: post._id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedPosts'] })
      toast.success(isSaved ? "Removed from bookmarks" : "Post saved!")
    },
    onError: (err) => toast.error(err.response?.data || "Action failed"),
  })

  const featureMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken()
      return axios.patch(`${import.meta.env.VITE_API_URL}/posts/feature`,
        { postId: post._id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', post.slug] })
      toast.success(post.isFeatured ? "Post unfeatured" : "Post featured!")
    },
    onError: (err) => toast.error(err.response?.data || "Action failed"),
  })

  if (error) return <div className="text-xs text-red-500 p-4">Failed to load actions.</div>

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-5 mt-8">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Actions</h3>

      {/* SAVE ACTION */}
      <button
        disabled={isPending || saveMutation.isPending}
        onClick={() => (user ? saveMutation.mutate() : navigate('/login'))}
        className={`flex items-center gap-3 w-full p-3 rounded-2xl transition-all duration-300 group ${
          isSaved ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'
        }`}
      >
        {saveMutation.isPending ? (
          <TailSpin height="18" width="18" color="currentColor" />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-transform group-hover:scale-110">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
        <span className="text-sm font-bold">{isSaved ? 'Saved to Bookmarks' : 'Save this Post'}</span>
      </button>

      {/* ADMIN FEATURE ACTION */}
      {isAdmin && (
        <button
          disabled={featureMutation.isPending}
          onClick={() => featureMutation.mutate()}
          className={`flex items-center gap-3 w-full p-3 rounded-2xl transition-all duration-300 group ${
            post.isFeatured ? 'bg-amber-50 text-amber-700' : 'bg-slate-50 text-slate-600 hover:bg-amber-50 hover:text-amber-600'
          }`}
        >
          {featureMutation.isPending ? (
            <TailSpin height="18" width="18" color="currentColor" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={post.isFeatured ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-transform group-hover:scale-110">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          )}
          <span className="text-sm font-bold">{post.isFeatured ? 'Featured Story' : 'Feature Post'}</span>
        </button>
      )}

      {/* DELETE ACTION */}
      {user && (post.user.username === user.username || isAdmin) && (
        <button
          disabled={deleteMutation.isPending}
          onClick={() => deleteMutation.mutate()}
          className="flex items-center gap-3 w-full p-3 rounded-2xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 group"
        >
          {deleteMutation.isPending ? (
            <TailSpin height="18" width="18" color="currentColor" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-transform group-hover:scale-110">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          )}
          <span className="text-sm font-bold">Delete Post</span>
        </button>
      )}
    </div>
  )
}

export default PostMenuActions