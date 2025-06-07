import Input from '@/components/Input'

function ProfileForm() {
  return (
    <section>
      <form
        className="mx-auto max-w-sm space-y-4 bg-white px-8 py-12 shadow-2xl"
        action=""
      >
        <span className="block text-center text-2xl">Edit Profile</span>
        <Input name="username" type="text" autoComplete />
        <Input name="email" type="email" label="Email address" autoComplete />
        <Input name="New password" type="password" />
        <Input
          name="Avatar image (url)"
          type="text"
          label="Avatar image (url)"
        />

        <button
          type="submit"
          className="mt-3 mb-2 w-full cursor-pointer rounded-md bg-[#1890FF] px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          Save
        </button>
      </form>
    </section>
  )
}
export default ProfileForm
