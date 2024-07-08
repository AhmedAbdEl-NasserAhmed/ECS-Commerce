import Spinner from "@/ui/Spinner/Spinner";

function loading() {
  return (
    <div className="bg-white bg-no-repeat bg-center min-h-screen flex items-center justify-center gap-8">
      <Spinner />
    </div>
  );
}

export default loading;
