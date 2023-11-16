import React, { useEffect } from "react";
// import { NavBar } from './navbar';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
// import { fetchUser } from "../redux/authSlice";
 
export const Layout = ({
  children
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    if(!user && !loading && !['/sign-in', '/sign-up'].includes(location.pathname)) {
      // dispatch(fetchUser());
    }
  }, [user, loading, location, dispatch]);

  return (
    <div>
      {/* <NavBar></NavBar> */}
      <div className="mx-auto max-w-screen-md py-6">
        { children }
      </div>
    </div>
  );
}