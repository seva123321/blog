import { useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

import { useGetArticleBySlugQuery } from '@/redux/articleApi'
import { useUpdateArticleMutation } from '@/redux'

import EditForm from './EditForm'

function EditPage() {
  const { slug } = useParams()
  const { data = {}, isLoading, isError } = useGetArticleBySlugQuery(slug)
  const [updateArticle] = useUpdateArticleMutation(slug)
  const handleSubmit = async (sendData) => {
    try {
      await updateArticle({ body: sendData, slug }).unwrap()
      toast.success('Article updated successfully!')
    } catch (err) {
      if (err.data?.errors) {
        const { error, message } = err.data.errors
        toast.error(`${error.name || 'Error'}: ${message}`)
      } else {
        toast.error('An unknown error occurred')
      }
    }
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }
  if (isError) {
    return <h1>Error Loading!</h1>
  }
  if (!data?.article) return <h1>Article not found</h1>

  return (
    <div>
      <EditForm
        header="Edit article"
        article={data.article}
        onSubmit={handleSubmit}
      />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default EditPage
