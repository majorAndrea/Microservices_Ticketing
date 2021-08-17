import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/useRequest.hook";

const SignIn = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const { dispatchRequest, errors } = useRequest({
    url: "/api/users/signin",
    method: "post",
    body: {
      ...userCredentials,
    },
    onSuccess: () => Router.push("/"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatchRequest();
  };

  return (
    <>
      {errors}
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <fieldset>
          <div className="form-group">
            <label htmlFor="email-address">Email Address:</label>
            <input
              id="email-address"
              type="email"
              className="form-control"
              value={userCredentials.email}
              onChange={(e) =>
                setUserCredentials({
                  ...userCredentials,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="user-password">Password:</label>
            <input
              id="user-password"
              type="password"
              className="form-control"
              value={userCredentials.password}
              onChange={(e) =>
                setUserCredentials({
                  ...userCredentials,
                  password: e.target.value,
                })
              }
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default SignIn;
