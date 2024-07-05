import Spinner from "@/ui/Spinner/Spinner";
import { Box } from "@mui/material";

function loading() {
  return (
    <div className="bg-[url('/bg-gradient.png')] bg-no-repeat bg-center min-h-screen flex items-center justify-center gap-8">
      <Spinner />
    </div>
  );
}

export default loading;
