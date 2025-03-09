import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import {
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";

export const MyPosts = () => {
  const [user] = useAuthState(auth);
  const [postsList, setPostsList] = useState([]);
  const [likes, setLikes] = useState({});

  const postRef = collection(db, "posts");
  const likeRef = collection(db, "likes");

  const getPosts = async () => {
    if (user) {
      const q = query(postRef, where("userId", "==", user.uid));
      const data = await getDocs(q);
      setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
  };

  const getLikes = async () => {
    const likesSnapshot = await getDocs(likeRef);
    const likesData = likesSnapshot.docs.map((doc) => doc.data());

    // Group likes by postId
    const groupedLikes = {};
    likesData.forEach((like) => {
      if (!groupedLikes[like.postId]) {
        groupedLikes[like.postId] = [];
      }
      groupedLikes[like.postId].push(like.userId);
    });

    setLikes(groupedLikes);
  };

  const deletePost = async (postId) => {
    try {
      await deleteDoc(doc(db, "posts", postId));
      setPostsList(postsList.filter((post) => post.id !== postId));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPosts();
  }, [user]);

  useEffect(() => {
    if (postsList.length > 0) {
      getLikes();
    }
  }, [postsList]);

  if (!user) {
    return (
      <div className="bg-red-100 min-h-screen flex items-center justify-center">
        <h1 className="text-xl font-bold text-indigo-800">
          Please login first
        </h1>
      </div>
    );
  }

  return (
    <div className="bg-red-100 min-h-screen p-6">
      {postsList.map((post) => (
        <div
          key={post.id}
          className="bg-indigo-100 p-4 rounded-lg shadow-md mb-6 max-w-md mx-auto overflow-hidden"
        >
          <h1 className="text-xl font-bold text-indigo-800 mb-2">
            {post.title}
          </h1>
          <div className="text-indigo-700 mb-4">
            <p>{post.description}</p>
          </div>
          <div className="text-indigo-600 mb-4">
            <p>Likes: {likes[post.id]?.length || 0}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-indigo-600">@{post.username}</p>
            <button
              onClick={() => deletePost(post.id)}
              className="text-indigo-600 hover:text-indigo-800 cursor-pointer bg-indigo-300 rounded-full p-2"
            >
              Delete Post
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyPosts;
