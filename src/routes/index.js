import { 
  Routes,
  Route, 
  // Navigate
} from 'react-router-dom';
import { SignInPage } from '../pages/sign-in';
import { SignUpPage } from '../pages/sign-up';
import { AdminHomePage } from '../pages/admin/homepage';
import { HomePage } from '../pages/homepage';

const PrivateRoute = ({ element }) => {
  // const isAuthenticated = localStorage.getItem('token') !== null && localStorage.getItem('admin-token') !== null;
  return element // !!isAuthenticated ? element : <Navigate to="/sign-in" /> ;
};

// const PrivateAdminRoute = ({ element }) => {
//   const isAuthenticated = localStorage.getItem('admin-token') !== null;
//   return !!isAuthenticated ? element : <Navigate to="/sign-in" /> ;
// };

export const AppRoutes = () => {  
  return (
    <Routes>
      <Route exact path="/" element={ <PrivateRoute element={ <HomePage/> } /> } />
      <Route exact path="/sign-in" element={<SignInPage/>} />
      <Route exact path="/sign-up" element={<SignUpPage/>} />
      <Route exact path="/admin" element={ <PrivateRoute element={ <AdminHomePage/> } /> } />
      <Route path="*" element={<HomePage/>} />
    </Routes>
  )
}
