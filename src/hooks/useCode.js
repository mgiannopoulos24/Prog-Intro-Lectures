import { useEffect, useState, useCallback } from "react";

const secretCode = ["b", "a", "s", "h"];

export const useSecretCode = (callback) => {
  const [keys, setKeys] = useState([]);

  const handler = useCallback(({ key }) => {
    setKeys((prevKeys) =>
      [...prevKeys, key.toLowerCase()].slice(-secretCode.length),
    );
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [handler]);

  useEffect(() => {
    if (keys.join("") === secretCode.join("")) {
      callback();
      setKeys([]);
    }
  }, [keys, callback]);
};
