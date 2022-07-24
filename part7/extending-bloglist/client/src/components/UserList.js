import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeUserList } from "../reducers/userListReducer";

const UserList = () => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  console.log(userList);

  useEffect(() => {
    dispatch(initializeUserList());
  }, [dispatch]);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tr>
          <th>Name</th>
          <th>Blogs Posted</th>
        </tr>
        {userList &&
          userList.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
      </table>
    </div>
  );
};

export default UserList;
