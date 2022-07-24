import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SingleUser = () => {
  const { id } = useParams();
  const user = useSelector(
    (state) => state.userList && state.userList.find((user) => user.id === id)
  );

  return (
    <>
      {user && (
        <>
          <h3 className="title is-3">{user.name}</h3>
          <h4 className="title is-4">Contributed Blogs:</h4>
          <ul>
            {user.blogs.length === 0 ? (
              <p>No posts yet.</p>
            ) : (
              user.blogs.map((blog) => <li key={blog.id}>{blog.title}</li>)
            )}
          </ul>
        </>
      )}
    </>
  );
};

export default SingleUser;
