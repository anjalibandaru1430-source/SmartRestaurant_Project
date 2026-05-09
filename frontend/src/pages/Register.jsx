import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../features/auth/usersApiSlice';
import { setCredentials } from '../features/auth/authSlice';
import { Utensils } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading, error }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      try {
        const res = await register({ name, email, password, phone }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate('/');
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-xl">
        <div className="text-center">
          <Utensils className="mx-auto h-12 w-12 text-orange-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create an account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={submitHandler}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="relative block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="relative block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                id="phone"
                name="phone"
                type="text"
                className="relative block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                placeholder="Phone Number (Optional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="relative block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {message && <p className="text-red-500 text-sm text-center">{message}</p>}
          {error && <p className="text-red-500 text-sm text-center">{error?.data?.message || error.error}</p>}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-md bg-orange-600 px-3 py-3 text-sm font-semibold text-white hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 disabled:opacity-50"
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </div>
          <div className="text-sm text-center mt-4">
            <span className="text-gray-600">Already have an account? </span>
            <Link to="/login" className="font-semibold text-orange-600 hover:text-orange-500">
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
