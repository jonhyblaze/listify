import Button from "./UI/Button";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ toggleSidebar, isSidebarOn }) => {
  const { signOut, auth } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("SignOut succesfull");
        navigate("/login");
        toggleSidebar();
      })
      .catch((error) => {
        // An error happened.
        console.log("SignOut went wrong", error.code, error.status);
      });
  };
  return (
    <section className=" absolute flex h-screen w-full">
      <div className=" h-full w-4/6 bg-white pl-4 pr-2 pt-4">
        <div className="flex items-center justify-between">
          <h4 className="medium  text-xl">Pedro Lopez</h4>
          <img
            width={48}
            className="rounded-full border border-black"
            src="https://previews.123rf.com/images/elvie15veronika/elvie15veronika2005/elvie15veronika200500011/146300386-social-media-avatar-profile-a-young-man-portrait-of-an-arab-man-colorful-concept-vector-trendy.jpg"
          />
        </div>

        <div>
          <Button
            onClick={handleSignOut}
            className="mt-4 border-2 border-black px-10"
          >
            LOG OUT
          </Button>
        </div>
      </div>
      <div
        onClick={toggleSidebar}
        className="h-full w-2/6 bg-zinc-700 opacity-75 "
      ></div>
    </section>
  );
};

export default Sidebar;
