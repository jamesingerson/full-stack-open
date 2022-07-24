import loginService from "../services/login";
import blogService from "../services/blogs";

import { activeUser } from "../reducers/userReducer";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedInBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(activeUser(user));
      event.target.username.value = "";
      event.target.password.value = "";
      dispatch(setNotification(`User ${user.name} logged in`));
    } catch (exception) {
      dispatch(setNotification("Invalid credentials"));
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username{" "}
        <input className="input" type="text" name="username" id="username" />
      </div>
      <div>
        password{" "}
        <input
          className="input"
          type="password"
          name="password"
          id="password"
        />
      </div>
      <button className="button is-info  m-4" type="submit" id="login-button">
        login
      </button>
    </form>
  );
};

export default LoginForm;
