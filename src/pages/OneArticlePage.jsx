import { useNavigate, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { useSelector } from 'react-redux'

import { useGetArticleBySlugQuery } from '@/redux/articleApi'
import Item from '@/components/Item'

function OneArticlePage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const token = useSelector((state) => state.user.token)
  const username = useSelector((state) => state.user.username)
  const { data = {}, isLoading, isError } = useGetArticleBySlugQuery(slug)

  if (isLoading) {
    return <h1>Loading...</h1>
  }
  if (isError) {
    return <h1>Error Loading!</h1>
  }
  if (!data?.article) return <h1>Article not found</h1>

  const { article } = data
  const isSameUser = article.author.username === username

  return (
    <div className="mb-6 block">
      <button
        type="button"
        className="mb-2 cursor-pointer text-[#1890FF] transition-transform duration-300 hover:scale-110"
        onClick={() => navigate(-1)}
      >
        &#8678; НАЗАД
      </button>
      <div className="mb-20 bg-white shadow">
        <Item item={article} isAuth={!!token} isSameUser={isSameUser} />

        <div className="bg-white p-4 sm:p-5">
          {article.body ? (
            <ReactMarkdown
              class="prose max-w-none"
              disallowedElements={['script', 'iframe', 'object', 'embed']}
            >
              {article.body}
            </ReactMarkdown>
          ) : (
            <p>No content available</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default OneArticlePage
