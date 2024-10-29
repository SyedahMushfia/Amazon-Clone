import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import validator from "validator";
import PriorityHighSharpIcon from "@mui/icons-material/PriorityHighSharp";
import DoneIcon from "@mui/icons-material/Done";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { InputField, Form } from "../../interfaces";

interface IsValid {
  [key: string]: boolean;
}

function CreateAccountPage() {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState<Form>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Form>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState<Form>({
    name: "",
    email: "",
    password: "",
  });

  const [validity, setValidity] = useState<IsValid>({
    name: false,
    email: false,
    password: false,
  });

  const inputFields: InputField[] = [
    {
      id: "name",
      label: "Your name",
      type: "text",
      placeholder: "First and last name",
    },
    {
      id: "email",
      label: "Email",
      type: "text",
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "At least 6 characters",
    },
    {
      id: "confirmPassword",
      label: "Re-enter password",
      type: "password",
    },
  ];

  const handleInputFocus = (id: string) => {
    let message = "";
    switch (id) {
      case "name":
        message = "Enter at least 1 character";
        break;
      case "email":
        message = "Enter a valid email address";
        break;
      case "password":
        message = "Enter at least 6 characters";
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "",
    }));

    setMessage((prevMessages) => ({
      ...prevMessages,
      [id]: message,
    }));
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    let isValid = validity[id];

    switch (id) {
      case "name":
        setErrors((prevErrors) => ({
          ...prevErrors,
          name: value.trim() ? "" : "Enter your name",
        }));
        break;
      case "email":
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: value.trim()
            ? isValid
              ? ""
              : "Enter a valid email address"
            : "Enter your email",
        }));
        break;
      case "password":
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: value.trim()
            ? value.length >= 6
              ? ""
              : "Enter at least 6 characters"
            : "Enter a password",
        }));
        break;
      case "confirmPassword":
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: value.trim()
            ? value === formValues.password
              ? ""
              : "Passwords must match"
            : "Type your password again",
        }));
        break;
      default:
        break;
    }

    setMessage((prevMessage) => ({
      ...prevMessage,
      [id]: "",
    }));

    setFirstInputFocused(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));

    let message = "";
    let isValid = false;

    switch (id) {
      case "name":
        isValid = value.length >= 1;
        message = isValid
          ? "Enter at least 1 character"
          : "Enter at least 1 character";
        break;
      case "email":
        isValid = validator.isEmail(value);
        message = isValid
          ? "Enter a valid email address"
          : "Enter a valid email address";
        break;
      case "password":
        isValid = value.length >= 6;
        message = isValid
          ? "Enter at least 6 characters"
          : "Enter at least 6 characters";
        break;
      default:
        break;
    }

    setMessage((prevMessage) => ({
      ...prevMessage,
      [id]: message,
    }));

    setValidity((prevValidity) => ({
      ...prevValidity,
      [id]: isValid,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "",
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { name, email, password } = formValues;

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log(user.displayName);

        await updateProfile(user, {
          displayName: name,
        });
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const [firstInputFocused, setFirstInputFocused] = useState(false);

  useEffect(() => {
    setFirstInputFocused(true);
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen justify-between">
        {" "}
        {/* Set the main container to full height */}
        <div className="flex flex-col justify-start items-center flex-grow">
          {" "}
          {/* Allow this part to grow */}
          <Link to="/">
            <div className="mb-[2%]">
              <img src="images/amazon-dark-logo.png" alt="amazon-logo" />
            </div>
          </Link>
          <form onSubmit={handleSubmit}>
            <div className="w-[25vw] min-h-[50vh] px-[6%] py-[4%] font-sans flex flex-col mt-[1%] border-[1px] border-slate-300 rounded-[3%]">
              <div className="text-clamp16 ">Create account</div>
              {inputFields.map((input, index) => (
                <div key={input.id} className="flex flex-col mt-[5%]">
                  <label
                    htmlFor={input.id}
                    className="text-clamp1 font-bold tracking-wide text-gray-800 mb-[0.5%]"
                  >
                    {input.label}
                  </label>
                  <input
                    type={input.type}
                    id={input.id}
                    value={formValues[input.id]}
                    placeholder={input.placeholder}
                    onFocus={() => handleInputFocus(input.id)}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className={`h-[5vh] text-clamp1 ${
                      errors[input.id]
                        ? "outline-none border-red-700 border-[2px]  rounded-[4px] px-[2%] py-[1%]"
                        : firstInputFocused && index === 0
                        ? "outline-none border-[1.5px] border-slate-400 rounded-[4px] px-[2%] py-[1%] ring-cyan-200 ring-[2px] bg-cyan-50"
                        : "border-[1.5px] border-slate-400 rounded-[4px] px-[2%] py-[1%] outline-none focus:ring-cyan-200 focus:ring-[2px] focus:bg-cyan-50"
                    }`}
                  />
                  {errors[input.id] ? (
                    <>
                      <div className="flex items-center gap-1 pt-[2%] text-red-700">
                        <PriorityHighSharpIcon
                          style={{
                            fontSize:
                              "clamp(0.4375rem, 0.2614rem + 0.7512vw, 0.9375rem)",
                          }}
                        />
                        <div className="text-clamp6">{errors[input.id]}</div>
                      </div>
                    </>
                  ) : message[input.id] ? (
                    <div className="flex items-center gap-1 pt-[1%]">
                      <DoneIcon
                        style={{
                          fontSize:
                            "clamp(0.625rem, 0.4269rem + 0.8451vw, 1.1875rem)",
                        }}
                        className={`${
                          validity[input.id]
                            ? "text-green-700 mt-[1%]"
                            : "text-gray-500 mt-[1%]"
                        }`}
                      />
                      <p
                        className={
                          validity[input.id]
                            ? "text-green-700 text-clamp6 mt-[1%]"
                            : "text-gray-500 text-clamp6 mt-[1%]"
                        }
                      >
                        {message[input.id]}
                      </p>
                    </div>
                  ) : null}
                </div>
              ))}
              <button className="bg-yellow-400 mt-[4%] mb-[9%] text-clamp1 py-[2%] tracking-wide rounded-[8px] active:ring-cyan-200 active:ring-[2px] active:bg-yellow-500">
                Continue
              </button>
              <p className="text-clamp7 mb-[9%]">
                By creating an account, you agree to Amazon's{" "}
                <span className="text-blue-800 underline">
                  Conditions of Use
                </span>{" "}
                and{" "}
                <span className="text-blue-800 underline">Privacy Notice</span>.
              </p>
              <div className=" bg-slate-200 h-[0.125vh] mb-[5%]">
                {/*Line Break */}
              </div>
              <p className="text-clamp1 font-bold tracking-wide">
                Buying for work?
              </p>
              <p className="text-clamp1 text-blue-800 mb-[5%]">
                Create a free business account
              </p>
              <div className=" bg-slate-200 h-[0.125vh] mb-[9%]">
                {/*Line Break */}
              </div>
              <div className="flex items-center gap-1">
                <p className="text-clamp1">Already have an account?</p>

                <Link to="/signIn">
                  <p className="text-clamp1 text-blue-600 hover:cursor-pointer focus:cursor-pointer">
                    Sign in
                  </p>
                </Link>

                <ArrowRightIcon
                  className="text-blue-800 -ml-[2%]"
                  style={{
                    fontSize:
                      "clamp(0.4375rem, 0.1734rem + 1.1268vi, 1.1875rem)",
                  }}
                />
              </div>
            </div>
          </form>
        </div>
        <footer className="text-clamp6 bg-gray-100 flex-grow h-[36vh] w-full mt-[2%] py-[2.7%] border-t-[1px] drop-shadow-2xl">
          <div className="flex justify-center gap-5 text-blue-800 mb-[0.25%]">
            <span>Conditions of Use</span>
            <span>Privacy Notice</span>
            <span>Help</span>
          </div>
          <div className="text-slate-500 flex justify-center">
            © 1996-2024, Amazon.com, Inc. or its affiliates
          </div>
        </footer>
      </div>
    </>
  );
}

export default CreateAccountPage;
