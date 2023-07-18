import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { context } from "./context/GlobalContext";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import HeaderComponent from "./components/HeaderComponent";
import AllProduct from "./pages/AllProduct";
import Tables from "./pages/Tables";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateProduct from "./pages/CreateProduct";
import UpdateProduct from "./pages/UpdateProduct";
import "./App.css";

function App() {
  const { data, fetchArticles, fetchArticlesProject, getDataProject } = useContext(context);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage data={data} fetchArticles={fetchArticles} fetchArticlesProject={fetchArticlesProject} getDataProject={getDataProject}>
                <HeaderComponent data={data} fetchArticles={fetchArticles} fetchArticlesProject={fetchArticlesProject} getDataProject={getDataProject} />
              </HomePage>
            }
          />
          <Route
            path="/detail/:id"
            element={
              <DetailPage>
                <HeaderComponent data={data} fetchArticles={fetchArticles} fetchArticlesProject={fetchArticlesProject} getDataProject={getDataProject} />
              </DetailPage>
            }
          />
          <Route
            path="/products"
            element={
              <AllProduct fetchArticlesProject={fetchArticlesProject} getDataProject={getDataProject}>
                <HeaderComponent data={data} fetchArticles={fetchArticles} fetchArticlesProject={fetchArticlesProject} getDataProject={getDataProject} />
              </AllProduct>
            }
          />
          <Route
            path="/tables"
            element={
              <Tables fetchArticlesProject={fetchArticlesProject} getDataProject={getDataProject}>
                <HeaderComponent data={data} fetchArticles={fetchArticles} fetchArticlesProject={fetchArticlesProject} getDataProject={getDataProject} />
              </Tables>
            }
          />
          <Route
            path="/login"
            element={
              <Login>
                <HeaderComponent data={data} fetchArticles={fetchArticles} fetchArticlesProject={fetchArticlesProject} getDataProject={getDataProject} />
              </Login>
            }
          />
          <Route
            path="/register"
            element={
              <Register>
                <HeaderComponent data={data} fetchArticles={fetchArticles} fetchArticlesProject={fetchArticlesProject} getDataProject={getDataProject} />
              </Register>
            }
          />
          <Route
            path="/create"
            element={
              <CreateProduct>
                <HeaderComponent data={data} fetchArticles={fetchArticles} fetchArticlesProject={fetchArticlesProject} getDataProject={getDataProject} />
              </CreateProduct>
            }
          />
          <Route
            path="/getProduct/:id"
            element={
              <UpdateProduct>
                <HeaderComponent data={data} fetchArticles={fetchArticles} fetchArticlesProject={fetchArticlesProject} getDataProject={getDataProject} />
              </UpdateProduct>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
