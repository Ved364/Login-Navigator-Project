import { PostDetails } from "../Pages/PostDetailsPage";

type Props = {
  post: PostDetails;
};

const PostContent = ({ post }: Props) => {
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
