import React from "react";
// import { useSelector } from "react-redux";
// import { ProfileMenu } from "./profileMenu";
import {
  Navbar,
  // Typography,
} from "@material-tailwind/react";
 
 
export function NavBar() {
  // const user = useSelector((state) => state.auth.user);
  // const score = useSelector((state) => state.userQuestion.score);

  return (
    <Navbar className="sticky inset-0 z-10 h-max min-h-[60px] max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <div className="flex items-center">
          {/* <Typography variant='h1' color="blue-gray" className="font-bold">
            Score { Math.round(score * 100)/100 } / 100
          </Typography> */}
          {/* <ProfileMenu /> */}
        </div>        
      </div>
    </Navbar>
  );
}
