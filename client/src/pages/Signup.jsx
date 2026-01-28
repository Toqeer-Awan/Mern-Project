import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiCloudLine } from 'react-icons/ri';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    console.log('Signup:', formData);
    
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <RiCloudLine className="text-orange-500 text-4xl md:text-5xl" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Create Account</h1>
          <p className="text-gray-400 mt-1 text-sm md:text-base">Join Cloud Storage today</p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Field */}
          <div>
            <label className="block text-gray-300 mb-1 text-sm md:text-base" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Choose a username"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-300 mb-1 text-sm md:text-base" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-300 mb-1 text-sm md:text-base" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 pr-10"
                placeholder="Create a password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEye size={18} /> : <AiOutlineEyeInvisible size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-gray-300 mb-1 text-sm md:text-base" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 pr-10"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <AiOutlineEye size={18} /> : <AiOutlineEyeInvisible size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded text-sm md:text-base transition duration-200 mt-2"
          >
            Create Account
          </button>

          {/* Login Link */}
          <div className="text-center pt-4">
            <p className="text-gray-400 text-sm md:text-base">
              Already have an account?{' '}
              <Link to="/login" className="text-orange-500 hover:text-orange-400 font-medium">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;