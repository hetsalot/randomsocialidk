import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();

  provider.setCustomParameters({ prompt: "select_account" });

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);

    navigate("/");
  };
  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-red-100">
      <h1 className="font-bold text-[2rem] text-indigo-600">
        Sign in with Google to continue...
      </h1>
      <button
        onClick={signInWithGoogle}
        className="text-[1.3rem] m-2 border-3 border-indigo-600 text-indigo-600 font-bold bg-indigo-200 p-2 rounded-lg cursor-pointer "
      >
        Sign in
      </button>
    </div>
  );
};

export default Login;
