import axios from "axios";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

const executeCode = async (language, sourceCode) => {
  const response = await API.post("/execute", {
    language: language,
    version: "10.2.0",
    files: [
      {
        content: sourceCode,
      },
    ],
  });
  return response.data;
};

export default executeCode;