import { useStateContext } from "../../context/StateContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate, Link } from "react-router-dom";
import { saveAllSavedItemsOnLogout, saveCartOnLogout } from "../../utils";

interface DropdownSignInProps {
  onMouseEnter: () => void; // Function to handle mouse enter event
  onMouseLeave: () => void; // Function to handle mouse leave event
}

function DropdownSignIn(props: DropdownSignInProps) {
  const { state } = useStateContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (state.user)
      signOut(auth).then(() => {
        navigate("/");
        console.log("Signed out successfully");
      });
    await saveCartOnLogout(state.user, state.cart);
    await saveAllSavedItemsOnLogout(state.user, state.savedItems);
  };

  return (
    <>
      <div
        className="w-[35vw] z-50 bg-white absolute top-14 right-20 py-[1%] px-[1%] rounded-[0.5%]"
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      >
        {!state.user ? (
          <div className="flex flex-col justify-center items-center">
            <Link to="/signIn">
              <button className="bg-yellow-400 hover:cursor-pointer hover:underline text-clamp1 py-[1.5%] w-[15vw] tracking-wide rounded-[8px]">
                Sign in
              </button>
            </Link>
            <div className="text-clamp6">
              New customer?{" "}
              <Link to="/register">
                <span className="text-blue-800 hover:underline hover:text-amber-600">
                  Start here.
                </span>
              </Link>
            </div>
            <div className=" bg-slate-200 w-full h-[0.125vh] my-[1.5%]">
              {/*Line Break */}
            </div>
          </div>
        ) : null}
        <div className="flex justify-start gap-5 mt-[2%]">
          <div className="mr-[20%] flex flex-col gap-1">
            <div className="font-bold tracking-wide">Your Lists</div>
            <div className="text-clamp1 text-slate-600">Create a List</div>
            <div className="text-clamp1 text-slate-600">
              Find a List or Registry
            </div>
          </div>
          <div className=" bg-slate-200 h-auto w-[0.05vw] ">
            {/*Line Break */}
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-bold tracking-wide">Your Accounts</div>
            <div className="text-clamp1 text-slate-600">Account</div>
            <div className="text-clamp1 text-slate-600">Orders</div>
            <div className="text-clamp1 text-slate-600">Recommendations</div>
            <div className="text-clamp1 text-slate-600">Browsing History</div>
            <div className="text-clamp1 text-slate-600">Watchlist</div>
            <div className="text-clamp1 text-slate-600">
              Video Purchases & Rentals
            </div>
            <div className="text-clamp1 text-slate-600">Kindle Unlimited</div>
            <div className="text-clamp1 text-slate-600">Content & Devices</div>
            <div className="text-clamp1 text-slate-600">
              Subscribe & Save Items
            </div>
            <div className="text-clamp1 text-slate-600">
              Memberships & Subscriptions
            </div>
            <div className="text-clamp1 text-slate-600">Music Library</div>
            {state.user ? (
              <>
                <div className="text-clamp1 text-slate-600">
                  Switch Accounts
                </div>
                <div
                  onClick={handleLogout}
                  className="text-clamp1 text-slate-600 hover:cursor-pointer hover:text-amber-600 hover:underline"
                >
                  Sign Out
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
      <div className="border-b-white absolute top-12 right-52 border-l-8 border-r-8 border-b-8 w-0 h-0 border-l-transparent border-r-transparent"></div>
    </>
  );
}

export default DropdownSignIn;
