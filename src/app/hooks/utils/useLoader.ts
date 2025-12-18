import { useState } from "react";

export function useLoader() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const showLoader = (msg = "") => {
    setMessage(msg);
    setVisible(true);
  };

  const hideLoader = () => {
    setVisible(false);
    setMessage("");
  };

  return {
    visible,
    message,
    showLoader,
    hideLoader,
  };
}
