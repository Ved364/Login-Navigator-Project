import axios from "axios";
import { useState, useEffect, useCallback } from "react";
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
  const currentUser = localStorage.getItem("email");
  const navigate = useNavigate();

  const handleUserpage = () => {
    navigate(-1);
  };

  const handleFetch = useCallback(async () => {
    setLoading(true);
    try {
      const posts = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      setPost(posts.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return (
    <>
      {!loading && post && (
        <div className="userBackground postBackgroundImg">
          <div className="user-postTopBar">
            <div className="username">
              <h3>{currentUser}</h3>
            </div>
            <button
              type="button"
              className="pageButton"
              onClick={handleUserpage}
            >
              Back
            </button>
          </div>
          <PostContent post={post} />
        </div>
      )}
      {loading && <div>Loading...</div>}
      {!loading && !post && <div>Page not found</div>}
    </>
  );
};

export default PostDetailsPage;
