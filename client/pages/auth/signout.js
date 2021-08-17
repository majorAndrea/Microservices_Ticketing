import { useEffect } from "react";
import Router from "next/router";
import useRequest from "../../hooks/useRequest.hook";

const SignOut = () => {
  const { dispatchRequest } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => Router.push("/"),
  });

  useEffect(() => {
    dispatchRequest();
  }, []);

  return <div>Signing you out...</div>;
};

export default SignOut;
