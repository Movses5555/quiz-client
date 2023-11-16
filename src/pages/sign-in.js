import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInAsync } from '../redux/authSlice';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";

 
export const SignInPage = () => {
  const [data, setData] = useState({ username: '', password: '' });
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if(!!localStorage.getItem('admin-token')) {
      navigate('/admin')
    } else if(!!localStorage.getItem('token')) {
      navigate('/')
    }
  }, [navigate]);

  const handleChangeData = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  }

  const handleSignIn = () => {
    dispatch(signInAsync(data));
  };


  return (
    <div className="w-full flex justify-center mt-20">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign In
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input label="Username" size="lg" name='username' value={data.username} onChange={ handleChangeData }  />
          <Input type="password" label="Password" size="lg" name='password' value={data.password} onChange={ handleChangeData } />
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth  onClick={ handleSignIn }>
            Sign In
          </Button>
          <div className='mt-6 flex justify-center items-center'>
            <Typography variant="small" className="flex justify-center">
              Don't have an account?
            </Typography>
            <Link
              to={'/sign-up'}
            >
              <Typography
                variant="small"
                color="blue"
                className="ml-1 font-bold"
              >
                Sign up
              </Typography>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

