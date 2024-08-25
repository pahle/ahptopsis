import { auth } from '@/utils/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const Login = () => {
  if (cookies().get('session')) {
    redirect('/')
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex min-w-96 flex-col gap-4 rounded-xl border-2 bg-white p-8 text-center">
        <div className="text-3xl font-bold">
          <h1>Login</h1>
        </div>
        <form action={auth} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="username" className="text-start">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="rounded-lg border-2 p-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-start">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="rounded-lg border-2 p-2"
            />
          </div>
          <p>
            Belum punya akun?{' '}
            <a href="/register" className="font-semibold text-pink-500">
              Register
            </a>
          </p>
          <button
            type="submit"
            className="mt-4 rounded-full border border-[#4D6181] px-4 py-2 text-[#4D6181]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
