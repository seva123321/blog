import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Input from '@/components/Input'
import { SignInSchema } from '@/services/validationSchemas'
import TextArea from '@/components/TextArea'

function EditForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(SignInSchema) })
  // const [serverErrors, setServerErrors] = useState(null)
  const [tags, setTags] = useState([])
  const submitForm = async () => {
    // Ваша логика отправки формы
  }

  const handleAddTag = () => {
    setTags([...tags, { id: Date.now().toString(), value: '' }])
  }

  const handleDeleteTag = (idToDelete) => {
    setTags(tags.filter((tag) => tag.id !== idToDelete))
  }

  const handleTagChange = (id, value) => {
    setTags(tags.map((tag) => (tag.id === id ? { ...tag, value } : tag)))
  }

  return (
    <form
      className="mx-auto max-w-5xl space-y-4 bg-white px-8 py-12 shadow-2xl"
      onSubmit={handleSubmit(submitForm)}
    >
      <span className="block text-center text-2xl">Create new article</span>
      <Input
        type="text"
        label="Title"
        autoComplete="title"
        containerClass="mb-4"
        {...register('title')}
      />
      <Input
        type="text"
        label="Short description"
        autoComplete="description"
        containerClass="mb-4"
        error={errors.description?.message}
        // error={serverErrors?.data.errors?.password || errors.password?.message}
        {...register('description')}
      />

      <TextArea
        label="Text"
        id="article"
        error={errors.text?.message}
        {...register('text')}
      />

      <div className="flex">
        <div className={`w-6/12 w-full ${!tags.length && 'hidden'}`}>
          {tags.map((tag, index) => (
            <div
              key={tag.id}
              className="mb-2 flex w-6/12 w-full items-end space-x-4"
            >
              <div className="flex-1">
                <Input
                  type="text"
                  label={index === 0 ? 'Tags' : ''}
                  autoComplete="off"
                  useLabel={!index}
                  value={tag.value}
                  {...register(`Tag ${index + 1}`)}
                  onChange={(e) => handleTagChange(index, e.target.value)}
                  error={errors.tags?.message}
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => handleDeleteTag(tag.id)}
                  className="shrink cursor-pointer rounded-md border border-[#F5222D] px-9 py-2.5 whitespace-nowrap text-[#F5222D] transition-colors duration-300 hover:bg-[#e1929269]"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="w-6/12 w-full self-end">
          <button
            type="button"
            onClick={handleAddTag}
            className={` ${tags.length && 'mb-2 ml-4'} cursor-pointer rounded-md border border-[#1890FF] px-10 py-2.5 text-[#1890FF] transition-colors duration-300 hover:border-[#2018ff] hover:text-[#2018ff]`}
          >
            Add tag
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="mt-3 w-full max-w-sm cursor-pointer rounded-md bg-[#1890FF] px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
      >
        Send
      </button>
    </form>
  )
}

export default EditForm
