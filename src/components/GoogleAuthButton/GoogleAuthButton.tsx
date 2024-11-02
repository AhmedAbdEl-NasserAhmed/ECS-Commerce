// import { useLazySigninWithGoogleQuery } from "@/lib/features/api/usersApi";
// import Spinner from "@/ui/Spinner/Spinner";
// import Image from "next/image";

// interface IGoogleAuthButton {}

// const GoogleAuthButton: React.FC<IGoogleAuthButton> = (props) => {
//   const [signin, signinResponse] = useLazySigninWithGoogleQuery();

//   console.log("signinResponse", signinResponse);

//   const loading = signinResponse.isLoading || signinResponse.isFetching;

//   return (
//     <button
//       className="flex items-center justify-between gap-4 border border-gray-500 px-6 py-2 rounded-full w-full text-[1.2rem] text-gray-800"
//       onClick={() => signin("users")}
//       disabled={loading}
//     >
//       <Image src={"/google.webp"} width={25} height={25} alt="google-auth" />
//       {loading ? <Spinner /> : <span>Sign in with Google</span>}
//       <span></span>
//     </button>
//   );
// };

// export default GoogleAuthButton;

import Image from "next/image";
import Link from "next/link";

interface IGoogleAuthButton {}

const GoogleAuthButton: React.FC<IGoogleAuthButton> = (props) => {
  return (
    <Link
      className="flex items-center justify-between gap-4 border border-gray-500 px-6 py-2 rounded-full w-full text-[1.2rem] text-gray-800"
      href="http://localhost:8000/api/v1/auth/google"
      target="_blank"
    >
      <Image src={"/google.webp"} width={25} height={25} alt="google-auth" />
      <span>Sign in with Google</span>
      <span></span>
    </Link>
  );
};

export default GoogleAuthButton;
