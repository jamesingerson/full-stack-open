import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeUserList } from "../reducers/userListReducer";
import { Link } from "react-router-dom";

const UserList = () => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);

  useEffect(() => {
    dispatch(initializeUserList());
  }, [dispatch]);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs Posted</th>
          </tr>
        </thead>
        <tbody>
          {userList &&
            userList.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
