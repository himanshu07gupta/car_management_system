// import React from 'react';
// import { Link } from 'react-router-dom';

// const Signup = () => {
//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow-sm">
//         <h2 className="text-2xl font-semibold text-gray-900 mb-6">
//           Create an account
//         </h2>
        
//         <form className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Username
//             </label>
//             <input
//               type="text"
//               placeholder="Your username"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Your email
//             </label>
//             <input
//               type="email"
//               placeholder="xyz@gmail.com"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 px-4 border border-transparent rounded-md text-white bg-blue-600 hover:bg-blue-700 text-sm font-medium"
//           >
//             Create an account
//           </button>
//         </form>

//         <p className="mt-4 text-center text-sm text-gray-600">
//           Already have an account?{' '}
//           <Link to="/signin" className="text-blue-600 hover:text-blue-500">
//             Login here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };
// export default Signup;
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { API } from '../utils/ApiURI';
import Loader from '../components/Loader';
import Dashboard from './Dashboard';

const Signup = () => {
  const refUsername = useRef(null);
  const refEmail = useRef(null);
  const refPassword = useRef(null);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // const handleOnSubmit = async (e) => {
  //   e.preventDefault();
  //   const username = refUsername.current.value;
  //   const email = refEmail.current.value;
  //   const password = refPassword.current.value;

  //   if (!username || !email || !password) {
  //     toast.error('All fields are required');
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     const response = await axios.post(`${API}/register`, {
  //       username,
  //       email,
  //       password,
  //     });

  //     if (response.status === 201) {
  //       toast.success('Account created successfully!');
        
  //       navigate('/');
  //     }
  //   } catch (err) {
  //     if (axios.isAxiosError(err) && err.response) {
  //       if (err.response.status === 409) {
  //         toast.error('User already exists');
  //       } else {
  //         toast.error(err.response.data.message || 'Signup failed');
  //       }
  //     } else {
  //       toast.error('An error occurred');
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const username = refUsername.current.value;
    const email = refEmail.current.value;
    const password = refPassword.current.value;
  
    if (!username || !email || !password) {
      toast.error('All fields are required');
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await axios.post(`${API}/register`, {
        username,
        email,
        password,
      });
  
      if (response.status === 201) {
        toast.success('Account created successfully!');
        navigate('/');
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 409) {
          toast.error('User already exists');
        } else {
          toast.error(err.response.data.message || 'Signup failed');
        }
      } else {
        toast.error('An error occurred');
      }
    } finally {
      setLoading(false);
    }
  };
  

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Create an account
        </h2>

        <form onSubmit={handleOnSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Your username"
              ref={refUsername}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your email
            </label>
            <input
              type="email"
              placeholder="xyz@gmail.com"
              ref={refEmail}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              ref={refPassword}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md text-white bg-blue-600 hover:bg-blue-700 text-sm font-medium"
          >
            Create an account
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-500">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
