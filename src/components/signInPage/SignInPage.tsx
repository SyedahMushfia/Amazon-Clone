import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import PriorityHighSharpIcon from "@mui/icons-material/PriorityHighSharp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import validator from "validator";

function SignInPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [createAccount, setCreateAccount] = useState(false);

  const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    if (e.target.value.trim()) setError("");
  };

  const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);

    if (e.target.value.trim()) setError("");
  };

  const handleContinueClick = (e: FormEvent) => {
    e.preventDefault();

    if (validator.isEmail(email.trim())) {
      setError("");
      setIsValidEmail(true);
      console.log(email);
    } else {
      setError("Enter a valid email address");
      console.log(error);
    }
  };

  const handleSignIn = (e: FormEvent) => {
    e.preventDefault();

    if (!password.trim()) setPasswordError("Enter your password");
    else setPasswordError("");

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <Link to="/">
          <div className="mb-[2%]">
            <img src="images/amazon-dark-logo.png" alt="amazon-logo" />
          </div>
        </Link>

        <form onSubmit={isValidEmail ? handleSignIn : handleContinueClick}>
          <div className="w-[25vw] min-h-[50vh] px-[8%] py-[4%] font-sans flex flex-col mt-[1%] border-[1px] border-slate-300 rounded-[3%]">
            <div className="text-clamp16 mb-[3%]">Sign in</div>
            {!isValidEmail ? (
              <>
                <label
                  htmlFor="email"
                  className="text-clamp1 font-bold tracking-wide text-gray-800 mb-[2%]"
                >
                  Email or mobile phone number
                </label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={handleEmailInput}
                  className={` h-[5vh] text-clamp1  ${
                    error
                      ? "outline-none border-red-700 border-[2px] ring-[3px] ring-red-100 rounded-[4px] px-[2%] py-[1%]"
                      : "border-[1.5px] border-slate-400 rounded-[4px] px-[2%] py-[1%] outline-none focus:ring-cyan-200 focus:ring-[2px] focus:bg-cyan-50"
                  }`}
                />
                {error ? (
                  <>
                    <div className="flex items-center gap-1 pt-[2%] text-red-700">
                      <PriorityHighSharpIcon
                        style={{
                          fontSize:
                            "clamp(0.4375rem, 0.2614rem + 0.7512vw, 0.9375rem)",
                        }}
                      />
                      <div className="text-clamp6">{error}</div>
                    </div>
                  </>
                ) : null}
                <button className="bg-yellow-400 mt-[4%] mb-[5%] text-clamp1 py-[2%] tracking-wide rounded-[8px] active:ring-cyan-200 active:ring-[2px] active:bg-yellow-500">
                  Continue
                </button>
                <span className="text-clamp6 mb-[7%]">
                  By continuing, you agree to Amazon's{" "}
                  <span className="text-blue-800 underline">
                    Conditions of Use
                  </span>{" "}
                  and{" "}
                  <span className="text-blue-800 underline">
                    Privacy Notice
                  </span>
                  .
                </span>
                <div className="flex items-center -ml-[3%] mb-[7%]">
                  <ArrowRightIcon
                    className="text-gray-600"
                    style={{
                      fontSize:
                        "clamp(0.4375rem, 0.1734rem + 1.1268vi, 1.1875rem)",
                    }}
                  />
                  <span className="text-clamp3 tracking-wide text-blue-800">
                    Need help?
                  </span>
                </div>
                <div className=" bg-slate-200 h-[0.125vh] mb-[5%]">
                  {/*Line Break */}
                </div>
                <span className="text-clamp3 font-bold tracking-wide text-gray-800 mb-[3%]">
                  Buying for work?
                </span>
                <span className="text-clamp3 text-blue-800">
                  Shop on Amazon Business
                </span>
              </>
            ) : (
              <>
                <div className="flex gap-1 text-clamp1">
                  <div className=" tracking-wide">{email}</div>
                  <div className="text-blue-800 hover:cursor-pointer hover:text-amber-700 hover:underline">
                    Change
                  </div>
                </div>
                <div className="flex justify-between text-clamp1 mt-[5%] mb-[1%]">
                  <label htmlFor="password" className="font-bold tracking-wide">
                    Password
                  </label>{" "}
                  <p className="text-blue-800 hover:cursor-pointer hover:text-amber-700 hover:underline">
                    Forgot password?
                  </p>
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordInput}
                  className={`" h-[5vh]" ${
                    passwordError
                      ? "outline-none border-red-700 border-[2px] ring-[3px] ring-red-100 rounded-[4px] px-[2%] py-[1%]"
                      : "border-[1.5px] border-slate-400 rounded-[4px] px-[2%] py-[1%] outline-none focus:ring-cyan-200 focus:ring-[2px] focus:bg-cyan-50"
                  }`}
                />
                {passwordError ? (
                  <>
                    <div className="flex items-center gap-1 pt-[2%] text-red-700">
                      <PriorityHighSharpIcon
                        style={{
                          fontSize:
                            "clamp(0.4375rem, 0.2614rem + 0.7512vw, 0.9375rem)",
                        }}
                      />
                      <div className="text-clamp6">{passwordError}</div>
                    </div>
                  </>
                ) : null}
                <button
                  type="submit"
                  className="bg-yellow-400 mt-[7%] mb-[5%] text-clamp1 py-[2%] tracking-wide rounded-[8px] active:ring-cyan-200 active:ring-[2px] active:bg-yellow-500"
                >
                  Sign in
                </button>
                <div className="flex items-center gap-1">
                  <input type="checkbox" />

                  <label htmlFor="" className="text-clamp1">
                    Keep me signed in.
                  </label>
                  <p className="text-clamp1 text-blue-800 hover:cursor-pointer hover:text-amber-700 hover:underline">
                    Details
                  </p>
                  <ArrowDropDownIcon
                    className="text-gray-600"
                    style={{
                      fontSize:
                        "clamp(0.4375rem, 0.1734rem + 1.1268vi, 1.1875rem)",
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </form>
        {isValidEmail || createAccount ? null : (
          <>
            <div className="mt-[1.5%] flex items-center gap-2">
              <div className="  bg-slate-200 h-[0.125vh] w-[8.5vw]">
                {/*Line Break */}
              </div>
              <div className="text-clamp3 text-gray-500">New to Amazon?</div>
              <div className=" bg-slate-200 h-[0.125vh] w-[8.5vw]">
                {/*Line Break */}
              </div>
            </div>
            <div>
              <Link to="/register">
                <button
                  onClick={() => {
                    setCreateAccount(true);
                  }}
                  className="border-[1px] border-slate-300 rounded-[8px] drop-shadow-lg mt-[3%] text-clamp1 tracking-wide w-[25vw] py-[1.5%]"
                >
                  Create your Amazon account
                </button>
              </Link>
            </div>
          </>
        )}
        <div className="text-clamp6 bg-gray-100 w-full h-[18vh] flex-grow mt-[2%] pt-[2.5%] border-t-[1px] drop-shadow-2xl-">
          <div className="flex justify-center gap-5 text-blue-800 mb-[0.25%]">
            <span>Conditions of Use </span>
            <span>Privacy Notice</span>
            <span>Help</span>
          </div>
          <div className="text-slate-500 flex justify-center">
            © 1996-2024, Amazon.com, Inc. or its affiliates
          </div>
        </div>
      </div>
    </>
  );
}

export default SignInPage;
