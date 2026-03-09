import { format } from 'timeago.js'
import { useAuth, useUser } from '@clerk/clerk-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import axios from 'axios'

const Comment = ({ comment, postId }) => {
  const { user } = useUser()
  const { getToken } = useAuth()
  const role = user?.publicMetadata?.role

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async () => {
      const token = await getToken()
      return axios.delete(
        `${import.meta.env.VITE_API_URL}/comments/${comment._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] })
      toast.success('Comment deleted successfully')
    },
    onError: (error) => {
      toast.error(error.response?.data || 'Failed to delete comment')
    },
  })

  // Cleanly separate the authorization logic
  const canDelete = user && (comment.user.username === user.username || role === 'admin')

  return (
    <div className={`p-5 bg-white border border-slate-100 rounded-3xl shadow-sm mb-5 transition-all duration-300 group ${mutation.isPending ? 'opacity-50 pointer-events-none' : 'hover:shadow-md hover:border-indigo-50'}`}>
      
      {/* HEADER: Avatar, Details, and Action */}
      <div className="flex items-center gap-4">
        
        {/* Avatar */}
        <img
          src={
            comment.user.profile_img ||
            'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png'
          }
          alt={`${comment.user.username}'s avatar`}
          className="w-11 h-11 rounded-full object-cover ring-2 ring-slate-50 shadow-sm shrink-0"
        />
        
        {/* Name & Date */}
        <div className="flex flex-col">
          <span className="font-bold text-slate-800 text-sm">
            {comment.user.username}
          </span>
          <span className="text-xs font-medium text-slate-400">
            {format(comment.createdAt)}
          </span>
        </div>

        {/* Delete Action (Pushed to the far right using ml-auto) */}
        {canDelete && (
          <button
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
            title="Delete comment"
            className="ml-auto p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200"
          >
            {mutation.isPending ? (
              // Tiny spinner for the delete action
              <svg className="animate-spin w-5 h-5 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              // Sleek trash icon
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M3 6h18"></path>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            )}
          </button>
        )}
      </div>

      {/* COMMENT BODY */}
      <div className="mt-4 pl-[3.75rem]"> {/* Pl-[3.75rem] aligns the text exactly under the username, ignoring the avatar width */}
        <p className="text-slate-600 leading-relaxed text-sm md:text-base font-medium">
          {comment.desc}
        </p>
      </div>
      
    </div>
  )
}

export default Comment