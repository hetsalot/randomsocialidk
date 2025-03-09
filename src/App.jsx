import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home-page/home";
import Login from "./pages/login";
import Navbar from "./components/navbar";
import CreatePost from "./pages/create-post/createpost";
import MyPosts from "./pages/my-posts/myposts";

function App() {
  return (
    <div className="bg-red-100 min-h-screen">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/#/" element={<Home />} />
          <Route path="/#/login" element={<Login />} />
          <Route path="/#/createpost" element={<CreatePost />} />
          <Route path="/#/myposts" element={<MyPosts />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
