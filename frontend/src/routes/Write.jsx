import { useAuth, useUser } from '@clerk/clerk-react'
import 'react-quill-new/dist/quill.snow.css'
import ReactQuill from 'react-quill-new'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Upload from '../components/Upload'
import { TailSpin } from 'react-loader-spinner'

const Write = () => {
  const { isLoaded, isSignedIn } = useUser()
  const [value, setValue] = useState('')
  const [cover, setCover] = useState('')
  const [img, setImg] = useState('')
  const [video, setVideo] = useState('')
  const [progress, setProgress] = useState(0)

  const navigate = useNavigate()
  const { getToken } = useAuth()

  useEffect(() => {
    img && setValue((prev) => prev + `<p><img src="${img.url}"/></p>`)
  }, [img])

  useEffect(() => {
    video &&
      setValue(
        (prev) =>
          prev +
          `<p><iframe class="ql-video" src="${video.url}"/></iframe></p>`,
      )
  }, [video])

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken()
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
    onSuccess: (res) => {
      toast.success('Story published successfully! 🎉')
      navigate(`/${res.data.slug}`)
    },
    onError: (error) => {
      toast.error(error.response?.data || 'Failed to publish story')
    },
  })

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <TailSpin height="60" width="60" color="#4f46e5" ariaLabel="loading" />
      </div>
    )
  }

  if (isLoaded && !isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4 text-center px-4">
        <h2 className="text-2xl font-bold text-slate-800">
          Authentication Required
        </h2>
        <p className="text-slate-500">
          Please sign in to start writing your story.
        </p>
      </div>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    const data = {
      img: cover.filePath || '',
      title: formData.get('title'),
      category: formData.get('category'),
      desc: formData.get('desc'),
      content: value,
    }

    if (!data.title || !data.content) {
      toast.error('Please provide at least a title and some content.')
      return
    }

    mutation.mutate(data)
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 md:px-8 flex flex-col gap-10">
      {/* HEADER: Enhanced contrast with indigo border */}
      <div className="flex items-center justify-between border-b-2 border-indigo-100 pb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Draft a New Story
        </h1>

        <button
          disabled={mutation.isPending || (0 < progress && progress < 100)}
          onClick={() => document.getElementById('hidden-submit').click()}
          className="bg-indigo-600 text-white font-bold rounded-full px-10 py-3 shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? 'Publishing...' : 'Publish'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        {/* COVER IMAGE: Increased definition */}
        <div className="flex flex-col gap-3">
          <Upload type="image" setProgress={setProgress} setData={setCover}>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-100 text-slate-600 rounded-2xl text-sm font-bold hover:border-indigo-200 hover:bg-indigo-50/30 transition-all cursor-pointer group shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-indigo-500">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              {cover ? 'Image Selected ✓' : 'Add Cover Image'}
            </div>
          </Upload>
          {progress > 0 && progress < 100 && (
            <div className="w-full max-w-xs h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
              <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
          )}
        </div>

        {/* TITLE: High contrast placeholder and font weight */}
        <textarea
          name="title"
          placeholder="Story Title"
          className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 bg-transparent outline-none placeholder:text-slate-400 placeholder:opacity-50 resize-none min-h-[100px] leading-tight"
          rows={1}
          onInput={(e) => {
            e.target.style.height = 'auto'
            e.target.style.height = e.target.scrollHeight + 'px'
          }}
        />

        {/* METADATA: Unified "Boxy" feel for better definition on light backgrounds */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col gap-2 w-full md:w-1/3">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">
              Category
            </label>
            <select
              name="category"
              className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl text-slate-800 font-bold focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 transition-all cursor-pointer appearance-none shadow-sm"
            >
              <option value="general">General</option>
              <option value="web-design">Web Design</option>
              <option value="development">Development</option>
              <option value="databases">Databases</option>
              <option value="seo">Search Engines</option>
              <option value="cyber-security">Cyber Security</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>

          <div className="flex flex-col gap-2 w-full md:w-2/3">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">
              Short Description
            </label>
            <textarea
              name="desc"
              placeholder="What is this story about?"
              className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl text-slate-700 font-medium placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 transition-all resize-none min-h-[58px] shadow-sm"
              rows={1}
            />
          </div>
        </div>

        {/* EDITOR: "Canvas" style with better shadow and spacing */}
        <div className="flex flex-col gap-4 mt-4 relative">
          <div className="w-full min-h-[450px] bg-white rounded-[2.5rem] p-6 md:p-10 shadow-xl shadow-indigo-900/5 border border-slate-100">
            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              readOnly={0 < progress && progress < 100}
              placeholder="Tell your story..."
              className="write-editor"
            />
          </div>

          {/* SIDE TOOLS: Aligned better for modern UI */}
          <div className="absolute top-24 -left-14 hidden xl:flex flex-col gap-4">
            <Upload type="image" setProgress={setProgress} setData={setImg}>
              <button type="button" className="w-10 h-10 flex items-center justify-center rounded-full bg-white border-2 border-slate-100 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 shadow-sm transition-all hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
              </button>
            </Upload>
            <Upload type="video" setProgress={setProgress} setData={setVideo}>
              <button type="button" className="w-10 h-10 flex items-center justify-center rounded-full bg-white border-2 border-slate-100 text-slate-400 hover:text-red-500 hover:border-red-200 shadow-sm transition-all hover:scale-110">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
              </button>
            </Upload>
          </div>
        </div>

        <button id="hidden-submit" type="submit" className="hidden"></button>
      </form>
    </div>
  )
}

export default Write