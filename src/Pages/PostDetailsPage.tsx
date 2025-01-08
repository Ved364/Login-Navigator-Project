import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostContent from "../components/PostContent";

export type PostDetails = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const PostDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const currentUser = localStorage.getItem("currentUser");
  const navigate = useNavigate();

  const handleUserpage = () => {
    navigate(-1);
  };

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => {
        setPost(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      <div className="userBackground postBackgroundImg">
        <div className="user-postTopBar">
          <div className="username">
            <h3>{currentUser}</h3>
          </div>
          <button type="button" className="pageButton" onClick={handleUserpage}>
            Back
          </button>
        </div>
        <PostContent post={post} loading={loading} />
      </div>
    </>
  );
};

export default PostDetailsPage;
