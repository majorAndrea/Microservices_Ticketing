import axios from "axios";
import { useState } from "react";

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const dispatchRequest = async () => {
    try {
      setErrors(null);

      const response = await axios[method](url, body);

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      setErrors(
        <section className="alert alert-danger" role="alert">
          <h3>Attention!</h3>
          <ul className="my-0">
            {err.response.data.errors.map((error) => (
              <li key={error.message.replaceAll(" ", "")}>{error.message}</li>
            ))}
          </ul>
        </section>
      );
    }
  };

  return { dispatchRequest, errors };
};

export default useRequest;
