import { PostDetails } from "../Pages/PostDetailsPage";

type Props = {
  loading: boolean;
  post: PostDetails | null;
};

const PostContent = ({ loading, post }: Props) => {
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
};

export default PostContent;
