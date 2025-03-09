import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
export const CreateForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required("You must add a title"),
    description: yup.string().required("You must add a description"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const postRef = collection(db, "posts");

  const onCreatePost = async (data) => {
    console.log(data);
    await addDoc(postRef, {
      username: user?.displayName,
      userId: user?.uid,
      //   title: data.title,
      //   description: data.description,       same as below
      ...data,
    });

    navigate("/");
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onCreatePost)}
        className="flex justify-center  flex-col gap-4 m-4 p-10 bg-indigo-500 rounded-lg w-[50vw]"
      >
        <input
          placeholder="title..."
          {...register("title")}
          className="bg-indigo-200 m-2 p-2 rounded-lg text-center"
        />
        <p className="text-red-600 font-bold self-center">
          {errors.title?.message}
        </p>
        <textarea
          placeholder="description..."
          {...register("description")}
          className="bg-indigo-200 m-2 p-2 rounded-lg text-center"
        />
        <p className="text-red-600 font-bold self-center">
          {errors.description?.message}
        </p>
        <input
          type="submit"
          className="border-2 border-indigo-200 bg-indigo-500 rounded-2xl m-1 p-2 text-indigo-200 cursor-pointer hover:bg-indigo-200 hover:text-indigo-500 w-[20%] font-bold transition-all justify-center items-center self-center"
        />
      </form>
    </div>
  );
};
