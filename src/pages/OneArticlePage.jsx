import { useNavigate, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

import { useGetArticleBySlugQuery } from '@/redux/articleApi'
import Item from '@/components/Item'

function OneArticlePage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { data = {}, isLoading, isError } = useGetArticleBySlugQuery(slug)

  if (isLoading) {
    return <h1>Loading...</h1>
  }
  if (isError) {
    return <h1>Error Loading!</h1>
  }
  if (!data?.article) return <h1>Article not found</h1>

  const { article } = data

  return (
    <div className="mb-6 block">
      <button
        type="button"
        className="mb-2 cursor-pointer text-[#1890FF] transition-transform duration-300 hover:scale-110"
        onClick={() => navigate(-1)}
      >
        &#8678; НАЗАД
      </button>
      <div className="h-200 bg-white shadow">
        <Item item={article} />

        <div className="bg-white p-4 sm:p-5">
          {article.body ? (
            <ReactMarkdown class="prose max-w-none">
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
