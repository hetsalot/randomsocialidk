import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/login"); // HashRouter will ensure it becomes #/login
    });
  };

  return (
    <div className="navbar h-[10vh] w-full flex justify-between items-center px-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-[1.4rem] font-bold">
      <div className="navbar-links flex flex-row items-center gap-4">
        <Link to="/">Home</Link>
        {!user ? (
          <Link to="/login">Login</Link>
        ) : (
          <>
            <Link to="/createpost">Create Post</Link>
            <Link to="/myposts">My Posts</Link>
          </>
        )}
      </div>
      <div className="navbar-user-info flex items-center gap-4">
        {user && (
          <>
            <p>{user?.displayName}</p>
            <img
              src={user?.photoURL || ""}
              alt="User"
              width="40"
              height="40"
              className="rounded-full"
            />
            <button
              onClick={handleSignOut}
              className="ml-4 border-white border-2 cursor-pointer justify-center items-center text-center px-2 py-1 rounded"
            >
              Log out
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
