import { Link } from 'react-router-dom'

import Input from '@/components/Input'
import ROUTES from '@/services/routes'

function RegPage() {
  return (
    <section>
      <form
        className="mx-auto max-w-sm space-y-4 bg-white px-8 py-12 shadow-2xl"
        action=""
      >
        <span className="block text-center text-2xl">Create new account</span>
        <Input name="username" type="text" autoComplete containerClass="mb-4" />
        <Input
          name="email"
          type="email"
          label="Email address"
          autoComplete
          containerClass="mb-4"
        />
        <Input name="password" type="password" containerClass="mb-4" />
        <Input
          name="password"
          type="password"
          label="Repeat Password"
          containerClass="mb-4"
        />
        <hr className="border-0.5 border-[#BFBFBF]" />

        <Input
          name="checkbox"
          type="checkbox"
          label="I agree to the processing of my personal information"
          containerClass="mb-4"
        />

        <button
          type="button"
          className="mt-5 mb-2 w-full cursor-pointer rounded-md bg-[#1890FF] px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          Create
        </button>

        <span className="flex justify-center text-xs text-[#8C8C8C]">
          Already have an account?&nbsp;
          <Link to={ROUTES.SIGN_IN} className="text-[#1890FF] hover:underline">
            Sign In
          </Link>
          .
        </span>
      </form>
    </section>
  )
}

export default RegPage
