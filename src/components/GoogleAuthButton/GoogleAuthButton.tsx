import Spinner from "@/ui/Spinner/Spinner";
import { GoogleLogin } from "@react-oauth/google";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

interface IGoogleAuthButton {
  googleLogin: any;
  callback: (response: any) => void;
  googleLoginResponse: any;
  toDown?: boolean;
}

const GoogleAuthButton: React.FC<IGoogleAuthButton> = (props) => {
  const tMessage = useTranslations("messages");

  const responseMessage = (response) => {
    props
      .googleLogin({ credential: response.credential })
      .unwrap()
      .then(props.callback)
      .catch((err) => {
        toast.error(tMessage(err?.data?.message));
      });
  };

  const errorMessage = () => {
    console.log("ERROR LOGIN WITH GOOGLE");
  };

  const margin = props.toDown ? "pb-0" : "pb-10";
  return (
    <div className={`p-8 ${margin}`}>
      {!props.toDown && (
        <p className="text-center my-4 relative text-[2rem] text-[#333] or-or">
          OR
        </p>
      )}
      <div className="text-center">
        <div className={`${props.toDown ? "pb-5" : ""}`}>
          {!props.googleLoginResponse.isLoading ? (
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
          ) : (
            <Spinner />
          )}
        </div>
        {props.toDown && (
          <p className="text-center my-4 relative text-[2rem] text-[#333] or-or">
            OR
          </p>
        )}
      </div>
    </div>
  );
};

export default GoogleAuthButton;

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
