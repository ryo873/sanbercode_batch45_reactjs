import axios from "axios";
import { createContext, useState } from "react";

export const context = createContext();

export const GlobalContext = ({ children }) => {
  const [data, setData] = useState({});
  const [getDataProject, setDataProject] = useState([]);

  const fetchArticles = async () => {
    try {
      const number = Math.round(Math.random() * (20 - 1) + 1);
      const response = await axios.get(`https://fakestoreapi.com/products/${number}`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchArticlesProject = async () => {
    try {
      const response = await axios.get("https://api-project.amandemy.co.id/api/final/products");
      setDataProject(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return <context.Provider value={{ data: data, fetchArticles: fetchArticles, fetchArticlesProject: fetchArticlesProject, getDataProject: getDataProject }}>{children}</context.Provider>;
};
