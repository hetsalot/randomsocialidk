import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "../../config/firebase";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
} from "firebase/firestore";
import { auth } from "../../config/firebase";
import { useEffect, useState } from "react";

export const Post = (props) => {
  const { post } = props;
  const [user] = useAuthState(auth);
  const likeRef = collection(db, "likes");
  const [likes, setLikes] = useState([]);

  const getLikes = async () => {
    const likesQuery = query(likeRef, where("postId", "==", post.id));
    const data = await getDocs(likesQuery);
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, id: doc.id }))
    );
  };

  const hasUserLiked = likes.find((like) => like.userId === user?.uid);

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likeRef, {
        userId: user?.uid,
        postId: post.id,
      });
      setLikes((prev) => [...prev, { userId: user?.uid, id: newDoc.id }]);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likeRef,
        where("userId", "==", user?.uid),
        where("postId", "==", post.id)
      );
      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, "likes", likeId);
      await deleteDoc(likeToDelete);
      setLikes((prev) => prev.filter((like) => like.id !== likeId));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div className="bg-red-100 p-6">
      <div className="bg-indigo-100 p-4 rounded-lg shadow-md max-w-md mx-auto overflow-hidden">
        <h1 className="text-xl font-bold text-indigo-800 mb-2">{post.title}</h1>
        <div className="text-indigo-700 mb-4">
          <p>{post.description}</p>
        </div>
        <div className="text-indigo-600 mb-4">
          <p>Likes: {likes.length}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-indigo-600">@{post.username}</p>
          <div className="flex items-center gap-2">
            <button
              onClick={hasUserLiked ? deleteLike : addLike}
              className="text-indigo-600 hover:text-indigo-800 cursor-pointer bg-indigo-300 rounded-full p-2"
            >
              {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
