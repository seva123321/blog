import { toast, ToastContainer } from 'react-toastify'

import { usePostArticleMutation } from '@/redux'

import EditForm from './EditForm'

function CreatePage() {
  const [postArticle] = usePostArticleMutation()
  const handleSubmit = async (sendData) => {
    try {
      await postArticle(sendData).unwrap() // CREATE
      toast.success('Article created successfully!')
    } catch (err) {
      if (err.data?.errors) {
        const { error, message } = err.data.errors
        toast.error(`${error.name || 'Error'}: ${message}`)
      } else {
        toast.error('An unknown error occurred')
      }
    }
  }
  return (
    <div>
      <EditForm header="Create new article" onSubmit={handleSubmit} />
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

export default CreatePage
