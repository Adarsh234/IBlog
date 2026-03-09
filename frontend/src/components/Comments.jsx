import axios from 'axios'
import Comment from './Comment'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth, useUser } from '@clerk/clerk-react'
import { toast } from 'react-toastify'
import { TailSpin } from 'react-loader-spinner' // Added this for consistency

const fetchComments = async (postId) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/comments/${postId}`
  )
  return res.data
}

const Comments = ({ postId }) => {
  const { user } = useUser()
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  const { isPending, error, data } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchComments(postId),
  })

  const mutation = useMutation({
    mutationFn: async (newComment) => {
      const token = await getToken()
      return axios.post(
        `${import.meta.env.VITE_API_URL}/comments/${postId}`,
        newComment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] })
    },
    onError: (error) => {
      toast.error(error.response?.data || 'Failed to post comment')
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const desc = formData.get('desc')
    
    // Prevent empty submissions
    if (!desc.trim()) return

    mutation.mutate(
      { desc },
      {
        // UX Upgrade: Clear the form ONLY if the submission succeeds
        onSuccess: () => {
          e.target.reset()
        },
      }
    )
  }

  return (
    <div className="flex flex-col gap-8 w-full pb-12">
      
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
          Discussion
        </h2>
        {/* Optional: Show comment count if data is loaded */}
        {data && (
          <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm font-bold">
            {data.length}
          </span>
        )}
      </div>

      {/* Comment Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full bg-slate-50/50 p-6 rounded-3xl border border-slate-100 shadow-sm"
      >
        <textarea
          name="desc"
          placeholder="What are your thoughts?"
          // Upgraded Textarea: Smooth focus rings, clean background, fixed min-height
          className="w-full bg-white p-5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-300 transition-all resize-y min-h-[120px] text-slate-700 placeholder:text-slate-400 font-medium"
        />
        <div className="flex justify-end">
          <button 
            disabled={mutation.isPending}
            // Upgraded Button: Matches Navbar style, disabled states for safety
            className="bg-slate-900 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-indigo-600 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {mutation.isPending ? 'Posting...' : 'Post Comment'}
          </button>
        </div>
      </form>

      {/* Render States */}
      {isPending ? (
        <div className="flex justify-center my-8">
          <TailSpin height="40" width="40" color="#4f46e5" ariaLabel="loading" />
        </div>
      ) : error ? (
        <div className="text-red-500 font-medium p-4 bg-red-50 rounded-2xl border border-red-100 text-center">
          Error loading comments! Please try refreshing.
        </div>
      ) : (
        <div className="flex flex-col gap-6 mt-4">
          
          {/* Optimistic UI (Sending Comment) */}
          {mutation.isPending && (
            <div className="opacity-50 pointer-events-none">
              <Comment
                comment={{
                  desc: `${mutation.variables.desc}`,
                  createdAt: new Date(),
                  user: {
                    img: user?.imageUrl,
                    username: user?.username || 'You',
                  },
                }}
              />
            </div>
          )}

          {/* Actual Comments */}
          {data.length === 0 ? (
            <div className="text-center text-slate-500 py-8 font-medium">
              No comments yet. Be the first to share your thoughts!
            </div>
          ) : (
            data.map((comment) => (
              <Comment key={comment._id} comment={comment} postId={postId} />
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default Comments