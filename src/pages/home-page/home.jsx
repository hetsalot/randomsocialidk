import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Post } from "./post";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";

const Home = () => {
  const postRef = collection(db, "posts");
  const [postsList, setPostsList] = useState([]);
  const [user] = useAuthState(auth);

  const getPost = async () => {
    const data = await getDocs(postRef);
    setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getPost();
  }, []);

  if (!user) {
    return (
      <div className="bg-red-100 min-h-screen flex items-center justify-center">
        <h1 className="text-[3rem] font-bold text-indigo-600">
          login karle na bhai pls
        </h1>
      </div>
    );
  }

  return (
    <div className="bg-red-100 min-h-screen">
      {postsList.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Home;
