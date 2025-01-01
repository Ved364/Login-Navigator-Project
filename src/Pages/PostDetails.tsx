import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";

type User = {
  username: string;
};

type PostDetails = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [username, setUsername] = useState<string | null>(null);
  const [post, setPost] = useState<PostDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

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

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const user: User = JSON.parse(currentUser);
      setUsername(user.username);
    }
  }, []);

  const handleUserpage = () => {
    navigate(-1);
  };

  const postDetailsContent = useMemo(() => {
    if (loading) {
      return <div>Loading.....</div>;
    }

    if (!post) {
      return <div>Post not found</div>;
    }

    return (
      <div className="postDetailsCard">
        <div className="postDetailsSmallCard m-4">
          <div className="d-flex gap-5 postsSmallSubCard">
            <h4 className="fw-bold">User Id: {post.userId}</h4>
            <h4>Id: {post.id}</h4>
          </div>
          <div className="p-3">
            <p>
              <span className="fw-bold">Title:</span> {post.title}
            </p>
            <p>
              <span className="fw-bold">Body:</span> {post.body}
            </p>
          </div>
        </div>
      </div>
    );
  }, [loading, post]);

  return (
    <>
      <div className="userBackground postBackgroundImg">
        <div className="user-postTopBar">
          <div className="username">
            <h3>{username}</h3>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleUserpage}
          >
            Back
          </button>
        </div>
        {postDetailsContent}
      </div>
    </>
  );
};

export default PostDetails;
