import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="flex h-100 flex-col items-center justify-center">
      <span>This page does not exist or never existed.</span>
      <Link className="text-2xl text-blue-400 hover:underline" to="/">
        Go to the main page
      </Link>
    </div>
  )
}

export default NotFoundPage
