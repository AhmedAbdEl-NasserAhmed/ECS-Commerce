import Input from "@/ui/Input/Input";
import styles from "./LoginForm.module.scss";
import Link from "next/link";
import Button from "@/ui/Button/Button";
import { HiArrowRightEndOnRectangle } from "react-icons/hi2";
import { HiOutlineUserAdd } from "react-icons/hi";

function LoginForm() {
  return (
    <form className="relative bg-white px-6 py-8 sm:px-9 sm:py-10 w-3/4 md:w-[60%] lg:w-1/2 xl:w-1/3 2xl:w-1/3 rounded-lg shadow-lg ">
      <div className="flex flex-col gap-12 ">
        <h2
          className={`${styles["form-header"]} text-[2rem] sm:text-[2.2rem] md:text-[2.4rem] h-[4vh]  font-extrabold `}
        >
          Welcome Back,
        </h2>
        <div className="flex flex-col gap-8 ">
          <Input type="email" extraPlaceholder="Email" />
          <Input type="password" extraPlaceholder="Password" />
        </div>
        <div className="flex flex-col gap-8 sm:gap-10 items-center">
          {/* <Button icon={<HiOutlineUserAdd />} variation="rgb(209 213 219)">
            Create a new account
          </Button> */}
          <Button
            icon={<HiArrowRightEndOnRectangle />}
            variation="rgb(6 182 212)"
          >
            Login
          </Button>
        </div>
        <div className="text-center">
          <Link
            className="text-cyan-500 font-semibold sm:text-md md:text-xl "
            href=""
          >
            Forgotten password?
          </Link>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
