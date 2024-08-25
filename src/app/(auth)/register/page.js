import { register } from '@/utils/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const Register = () => {
  if (cookies().get('session')) {
    redirect('/')
  }

  return (
    <div className="mx-20 my-20 flex items-center justify-center">
      <div className="flex min-w-96 flex-col gap-4 rounded-xl border-2 bg-white p-8 text-center">
        <div className="text-3xl font-bold">
          <h1>Register</h1>
        </div>
        <form action={register} className="flex flex-col gap-4">
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
          <div className="flex gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label htmlFor="HM" className="text-start">
                  Harga terhadap Merk
                </label>
                <select
                  name="HM"
                  id="HM"
                  className="mt-2 w-full rounded-lg border-2 border-gray-400 p-2"
                >
                  <option value={1 / 5}>1/5 Strong Unimportance</option>
                  <option value={1 / 4}>
                    1/4 Strong to Moderate Unimportance
                  </option>
                  <option value={1 / 3}>1/3 Moderate Unimportance</option>
                  <option value={1 / 2}>
                    1/2 Moderate to Low Unimportance
                  </option>
                  <option value={1}>1 Equal Importance</option>
                  <option value={2}>2 Equal to Moderate Importance</option>
                  <option value={3}>3 Moderate Importance</option>
                  <option value={4}>4 Moderate to Strong Importance </option>
                  <option value={5}>5 Strong Importance</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="HS" className="text-start">
                  Harga terhadap Shade
                </label>
                <select
                  className="mt-2 w-full rounded-lg border-2 border-gray-400 p-2"
                  name="HS"
                  id="HS"
                >
                  <option value={1}>Equal Importance</option>
                  <option value={3}>Moderate Importance</option>
                  <option value={5}>Strong Importance</option>
                  <option value={7}>Very Strong Importance</option>
                  <option value={9}>Extreme Importance</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="HK" className="text-start">
                  Harga terhadap Ketahanan
                </label>
                <select
                  className="mt-2 w-full rounded-lg border-2 border-gray-400 p-2"
                  name="HK"
                  id="HK"
                >
                  <option value={1}>Equal Importance</option>
                  <option value={3}>Moderate Importance</option>
                  <option value={5}>Strong Importance</option>
                  <option value={7}>Very Strong Importance</option>
                  <option value={9}>Extreme Importance</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="HC" className="text-start">
                  Harga terhadap Coverage
                </label>
                <select
                  className="mt-2 w-full rounded-lg border-2 border-gray-400 p-2"
                  name="HC"
                  id="HC"
                >
                  <option value={1}>Equal Importance</option>
                  <option value={3}>Moderate Importance</option>
                  <option value={5}>Strong Importance</option>
                  <option value={7}>Very Strong Importance</option>
                  <option value={9}>Extreme Importance</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="HJ" className="text-start">
                  Harga terhadap Jenis Kulit
                </label>
                <select
                  className="mt-2 w-full rounded-lg border-2 border-gray-400 p-2"
                  name="HJ"
                  id="HJ"
                >
                  <option value={1}>Equal Importance</option>
                  <option value={3}>Moderate Importance</option>
                  <option value={5}>Strong Importance</option>
                  <option value={7}>Very Strong Importance</option>
                  <option value={9}>Extreme Importance</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="MS" className="text-start">
                  Merk terhadap Shade
                </label>
                <select
                  className="mt-2 w-full rounded-lg border-2 border-gray-400 p-2"
                  name="MS"
                  id="MS"
                >
                  <option value={1}>Equal Importance</option>
                  <option value={3}>Moderate Importance</option>
                  <option value={5}>Strong Importance</option>
                  <option value={7}>Very Strong Importance</option>
                  <option value={9}>Extreme Importance</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="MK" className="text-start">
                  Merk terhadap Ketahanan
                </label>
                <select
                  className="mt-2 w-full rounded-lg border-2 border-gray-400 p-2"
                  name="MK"
                  id="MK"
                >
                  <option value={1}>Equal Importance</option>
                  <option value={3}>Moderate Importance</option>
                  <option value={5}>Strong Importance</option>
                  <option value={7}>Very Strong Importance</option>
                  <option value={9}>Extreme Importance</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="MC" className="text-start">
                  Merk terhadap Coverage
                </label>
                <select
                  className="mt-2 w-full rounded-lg border-2 border-gray-400 p-2"
                  name="MC"
                  id="MC"
                >
                  <option value={1}>Equal Importance</option>
                  <option value={3}>Moderate Importance</option>
                  <option value={5}>Strong Importance</option>
                  <option value={7}>Very Strong Importance</option>
                  <option value={9}>Extreme Importance</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label htmlFor="MJ" className="text-start">
                  Merk terhadap Jenis Kulit
                </label>
                <select
                  className="mt-2 w-full rounded-lg border-2 border-gray-400 p-2"
                  name="MJ"
                  id="MJ"
                >
                  <option value={1}>Equal Importance</option>
                  <option value={3}>Moderate Importance</option>
                  <option value={5}>Strong Importance</option>
                  <option value={7}>Very Strong Importance</option>
                  <option value={9}>Extreme Importance</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="SK" className="text-start">
                  Shade terhadap Ketahanan
                </label>
                <select
                  className="mt-2 w-full rounded-lg border-2 border-gray-400 p-2"
                  name="SK"
                  id="SK"
                >
                  <option value={1}>Equal Importance</option>
                  <option value={3}>Moderate Importance</option>
                  <option value={5}>Strong Importance</option>
                  <option value={7}>Very Strong Importance</option>
                  <option value={9}>Extreme Importance</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="SC" className="text-start">
                  Shade terhadap Coverage
                </label>
                <select
                  className="mt-2 w-full rounded-lg border-2 border-gray-400 p-2"
                  name="SC"
                  id="SC"
                >
                  <option value={1}>Equal Importance</option>
                  <option value={3}>Moderate Importance</option>
                  <option value={5}>Strong Importance</option>
                  <option value={7}>Very Strong Importance</option>
                  <option value={9}>Extreme Importance</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="SJ" className="text-start">
                  Shade terhadap Jenis Kulit
                </label>
                <select
                  className="mt-2 w-full rounded-lg border-2 border-gray-400 p-2"
                  name="SJ"
                  id="SJ"
                >
                  <option value={1}>Equal Importance</option>
                  <option value={3}>Moderate Importance</option>
                  <option value={5}>Strong Importance</option>
                  <option value={7}>Very Strong Importance</option>
                  <option value={9}>Extreme Importance</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="KC" className="text-start">
                  Ketahanan terhadap Coverage
                </label>
                <select
                  className="mt-2 w-full rounded-lg border-2 border-gray-400 p-2"
                  name="KC"
                  id="KC"
                >
                  <option value={1}>Equal Importance</option>
                  <option value={3}>Moderate Importance</option>
                  <option value={5}>Strong Importance</option>
                  <option value={7}>Very Strong Importance</option>
                  <option value={9}>Extreme Importance</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="KJ" className="text-start">
                  Ketahanan terhadap Jenis Kulit
                </label>
                <select
                  className="mt-2 w-full rounded-lg border-2 border-gray-400 p-2"
                  name="KJ"
                  id="KJ"
                >
                  <option value={1}>Equal Importance</option>
                  <option value={3}>Moderate Importance</option>
                  <option value={5}>Strong Importance</option>
                  <option value={7}>Very Strong Importance</option>
                  <option value={9}>Extreme Importance</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="CJ" className="text-start">
                  Coverage terhadap Jenis Kulit
                </label>
                <select
                  className="mt-2 w-full rounded-lg border-2 border-gray-400 p-2"
                  name="CJ"
                  id="CJ"
                >
                  <option value={1}>Equal Importance</option>
                  <option value={3}>Moderate Importance</option>
                  <option value={5}>Strong Importance</option>
                  <option value={7}>Very Strong Importance</option>
                  <option value={9}>Extreme Importance</option>
                </select>
              </div>
            </div>
          </div>
          <p>
            Sudah punya akun?{' '}
            <a href="/login" className="font-semibold text-pink-500">
              Login
            </a>
          </p>
          <button
            type="submit"
            className="mt-4 rounded-full border border-[#4D6181] px-4 py-2 text-[#4D6181]"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
