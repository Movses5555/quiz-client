import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signUpAsync } from '../redux/authSlice.js';
import {
  Card,
  Input,
  Button,
  Typography,
  CardHeader,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";

 
export const SignUpPage = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  let user = false

  useEffect(() => {
    if(user) {
      navigate('/')
    }
  }, [user, navigate]);

  const handleChangeData = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  }

  const handleSignUp = async () => {
    dispatch(signUpAsync(data));
    
  }

  return (
    <div className="w-full flex justify-center mt-20">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-2 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign Up
          </Typography>
        </CardHeader>
        <CardBody className="py-0 flex flex-col gap-4">
          <Typography color="gray" className="mt-1 font-normal">
            Enter your details to register.
          </Typography>
          <Input label="Username" size="lg" name='username' value={data.username} onChange={ handleChangeData } />
          <Input type="password" label="Password" size="lg" name='password' value={data.password} onChange={ handleChangeData } />
        </CardBody>
        <CardFooter className="pt-4">
          <Button
            fullWidth
            onClick={ handleSignUp }
          >
            Sign Up
          </Button>
          <div className='mt-6 flex justify-center items-center'>
            <Typography variant="small" className="flex justify-center">
              Already have an account?
            </Typography>
            <Link
              to={'/sign-in'}
            >
              <Typography
                variant="small"
                color="blue"
                className="ml-1 font-bold"
              >
                Sign In
              </Typography>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

