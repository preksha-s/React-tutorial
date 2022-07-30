import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import Youtube from "./components/Youtube";
import { Routes, Route, } from "react-router-dom";
import Nav from "./components/Nav";
import NavRouter from "./components/navrouter";
// This works and is the intended usage
import OrderSummary from "./components/OrderSummary";
import { Product } from "./components/Product";
import FeaturedProduct from "./components/FeaturedProduct";
import NewProduct from "./components/NewProduct";
import User from "./components/User";
import UserDetail from "./components/UserDetail";
import Admin from "./components/Admin";
import { lazy, Suspense } from "react";
import { Profile } from "./components/Profile";
// import About from "./components/About";

const LazyAbout = lazy(() => import("./components/About"));
function App() {
  const userLogged = localStorage.getItem("email") ? true : false;
  console.log(userLogged);
  return (
    <div className="App">
      {userLogged ? <Nav /> : <NavRouter />}
      <div className="con ">
        <Routes>
          <Route path="registration" exact element={<RegistrationForm />} />
          <Route path="youtube" element={<Youtube />} />
          <Route path="order-summary" element={<OrderSummary />} />
          <Route
            path="about"
            element={
              <Suspense fallback="Loading....">
                <LazyAbout />
              </Suspense>
            }
          />
          <Route path="products" element={<Product />}>
            {/* if we want the path to be render at parent level we need to use index route */}
            <Route index element={<FeaturedProduct />} />
            <Route path="featured" element={<FeaturedProduct />} />
            <Route path="new" element={<NewProduct />} />
          </Route>
          <Route path="users" element={<User />}>
            <Route path=":userId" element={<UserDetail />} />
            <Route path="admin" element={<Admin />} />
          </Route>

          {userLogged ? (
            <Route path="*" exact element={<Profile />} />
          ) : (
            <Route path="*" exact element={<LoginForm />} />
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;

// import logo from "./logo.svg";
// import "./App.css";
// import PostList from "./components/PostList";
// import PostForm from "./components/PostForm";
// import Youtube from "./components/Youtube";
//import Counter from "./components/counter";

{
  /* <PostList />
      <PostForm /> */
}
{
  /* <Youtube /> */
}
{
  /* <Youtube/> */
}
{
  /* <LoginForm/> */
}
{
  /* <Counter/> */
}
