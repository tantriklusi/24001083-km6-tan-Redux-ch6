import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import { BsPeopleFill } from "react-icons/bs";
import { IoMdEyeOff } from "react-icons/io";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { IoIosLock } from "react-icons/io";
import { GoogleLogin } from "@react-oauth/google";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmasi, setConfirmasi] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !email || !password || !confirmasi) {
      setError("Data belum lengkap.");
      return;
    }

    if (password !== confirmasi) {
      setError("Password dan konfirmasi password tidak sama.");
      setPassword("");
      setConfirmasi("");
      return;
    }

    try {
      await dispatch(register(name, email, password, confirmasi));
      alert(`Selamat Akunmu Berhasil Terdaftar!`);
      navigate("/");
    } catch (error) {
      setError("Terjadi kesalahan saat melakukan registrasi. Silakan coba lagi.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-black to-red-600 flex flex-col h-screen items-center justify-center">
      <div className="border-2 p-12 rounded-lg shadow-lg bg-white flex flex-col items-center">
        <div className="text-2xl mb-4 font-bold text-center">Create New Account</div>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="mb-6 w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Name">
              Name
            </label>
            <div className="flex items-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <BsPeopleFill className="mr-2" /> {/* Ikon diletakkan di sebelah kiri input */}
              <input type="text" id="name" className="w-full focus:outline-none" placeholder="name" value={name} onChange={(event) => setName(event.target.value)} />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <div className="flex items-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <MdOutlineAlternateEmail className="mr-2" /> {/* Ikon diletakkan di sebelah kiri input */}
              <input type="text" id="email" className="w-full focus:outline-none" placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </div>
          </div>
          <div className="mb-6 w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmasi">
              Password
            </label>
            <div className="flex items-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <IoIosLock className="mr-2" /> {/* Ikon diletakkan di sebelah kiri input */}
              <input type="text" id="confirmasi" className="w-full focus:outline-none" placeholder="password" value={confirmasi} onChange={(event) => setConfirmasi(event.target.value)} />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Confirm Password
            </label>
            <div className="flex items-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <IoMdEyeOff className="mr-2" /> {/* Ikon diletakkan di sebelah kiri input */}
              <input type="password" id="password" className="w-full focus:outline-none" placeholder="confirm password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>
          </div>
          <button type="submit" onClick={register} className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 mb-2 rounded focus:outline-none focus:shadow-outline w-full">
            Create Account
          </button>
        </form>
        {error && <div className="text-red-500 mt-4">{error}</div>}
        <p className="mb-2 font-semibold text-gray-500"> --- or continue with --- </p>
        <GoogleLogin />
      </div>
    </div>
  );
}
