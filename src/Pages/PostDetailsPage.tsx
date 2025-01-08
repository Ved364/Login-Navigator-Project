import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";

type PostDetails = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const PostDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [username, setUsername] = useState<string | null>(null);
  const [post, setPost] = useState<PostDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const currentUser = localStorage.getItem("currentUser");
  const navigate = useNavigate();

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
          <div className="postsSmallSubCard">
            <h4 className="header-heading">User Id: {post.userId}</h4>
            <h4>Id: {post.id}</h4>
          </div>
          <div className="cardpara-padding">
            <p>
              <span className="header-heading">Title:</span> {post.title}
            </p>
            <p>
              <span className="header-heading">Body:</span> {post.body}
            </p>
          </div>
        </div>
      </div>
    );
  }, [loading, post]);

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
    if (currentUser) {
      const parsedUser = JSON.parse(currentUser);
      setUsername(parsedUser);
    } else {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  return (
    <>
      <div className="userBackground postBackgroundImg">
        <div className="user-postTopBar">
          <div className="username">
            <h3>{username}</h3>
          </div>
          <button type="button" className="pageButton" onClick={handleUserpage}>
            Back
          </button>
        </div>
        {postDetailsContent}
      </div>
    </>
  );
};

export default PostDetailsPage;
