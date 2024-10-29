import { InputField, Form } from "../../interfaces";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ErrorIcon from "@mui/icons-material/Error";
import validator from "validator";
import { useStateContext } from "../../context/StateContext";
import { getFirestore, doc, setDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";

interface Country {
  name: {
    common: string;
  };
}

interface Address {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
}

interface AddressFormProps {
  onAddressSave: (address: Address) => void;
}

function AddressForm(props: AddressFormProps) {
  const { state } = useStateContext();

  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("United States");
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const [formValues, setFormValues] = useState<Form>({
    name: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Form>({
    name: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
  });

  const inputFields: InputField[] = [
    {
      id: "name",
      label: "Full name (First and Last name)",
      type: "text",
    },
    {
      id: "address",
      label: "Street address",
      type: "text",
      placeholder: "Street address, P.O. box, company name, c/o",
    },
    {
      id: "city",
      label: "City",
      type: "text",
    },
    {
      id: "state",
      label: "State / Province / Region",
      type: "text",
    },
    {
      id: "zipCode",
      label: "Zip Code",
      type: "text",
    },
    {
      id: "phone",
      label: "Phone number",
      type: "text",
    },
  ];

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();

        // Sort countries alphabetically by name
        const sortedCountries = data.sort((a: Country, b: Country) =>
          a.name.common.localeCompare(b.name.common)
        );

        setCountries(sortedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const toggleDropdown = () => {
    // To toggle the dropdown state
    setIsOpen(!isOpen);
  };

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setIsFocused(true);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "",
    }));
  };

  const validateForm = () => {
    const newErrors: Form = {
      name: "",
      address: "",
      city: "",
      zipCode: "",
      phone: "",
    };

    Object.keys(formValues).forEach((key) => {
      switch (key) {
        case "name":
          if (!formValues.name) newErrors.name = "Please enter a name.";
          break;
        case "address":
          if (!formValues.address)
            newErrors.address = "Please enter an address.";
          break;
        case "city":
          if (!formValues.city) newErrors.city = "Please enter a city name.";
          break;
        case "zipCode":
          if (!formValues.zipCode)
            newErrors.zipCode = "Please enter a ZIP or postal code.";
          break;
        case "phone":
          if (!formValues.phone || !validator.isMobilePhone(formValues.phone))
            newErrors.phone =
              "Please enter a phone number so we can call if there are any issues with delivery.";
          break;
        default:
          break;
      }
    });

    setErrors(newErrors);

    // Check if any errors are present
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      if (state.user) {
        try {
          const addressRef = doc(
            collection(db, "users", state.user.uid, "addresses")
          );

          await setDoc(addressRef, {
            name: formValues.name,
            street: formValues.address,
            city: formValues.city,
            state: formValues.state,
            zip: formValues.zipCode,
            country: selectedCountry,
            phone: formValues.phone,
          });

          console.log("Address added successfully.");
          props.onAddressSave({
            name: formValues.name,
            street: formValues.address,
            city: formValues.city,
            state: formValues.state,
            zip: formValues.zipCode,
            country: selectedCountry,
            phone: formValues.phone,
          });
        } catch (error) {
          console.error("Error saving address", error);
        }
      } else console.log("User not logged in.");
    } else {
      console.log("Validation failed!");
    }
  };

  const handleInputFocus = () => setIsFocused(false);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className=" ml-[5%] my-[1%] pl-[2.5%] pr-[25%] pt-[1.5%] border-[1px] border-slate-300 rounded-[8px]">
          <h2 className="text-clamp18 font-bold tracking-wide pb-[1%]">
            Add a new address
          </h2>
          <div className="flex gap-24 items-center mb-[4%] py-[2.5%] pl-[15%] text-clamp10 tracking-wide  bg-gradient-to-t from-cyan-100  to-cyan-50 border-[1px] border-cyan-500 rounded-[8px]">
            <p className="font-bold">
              Save time. Autofill your current location.
            </p>
            <button className="py-[1%] px-[2%] border-[1px] border-slate-500 rounded-[15px] bg-white">
              Autofill
            </button>
          </div>
          <div className="mb-[1.5%]">
            <div className="text-clamp10 font-bold tracking-wide mb-[0.5%]">
              Country/Region
            </div>
            {!isOpen && (
              <>
                <button
                  className={`w-full flex justify-between items-center px-[2%] py-[1%] bg-gray-100 hover:cursor-pointer border-[1px] border-slate-300 rounded-[8px] text-clamp3 tracking-wide ${
                    isFocused && "ring-offset-2 ring-[3px] ring-cyan-600"
                  } `}
                  onClick={toggleDropdown}
                >
                  {selectedCountry}
                  <KeyboardArrowDownIcon
                    className="text-gray-600"
                    style={{
                      fontSize: "20px",
                    }}
                  />
                </button>
              </>
            )}
            {isOpen && (
              <>
                <ul className="w-full  h-[70vh] overflow-y-scroll hover:cursor-pointer border-[1px] border-slate-300 rounded-[8px] text-clamp1 tracking-wide">
                  {countries.map((country) => {
                    return (
                      <li
                        key={country.name.common}
                        onClick={() => {
                          handleCountrySelect(country.name.common);
                        }}
                        className={`py-[0.5%] pl-[3%]  ${
                          selectedCountry === country.name.common
                            ? "border-[3.5px] border-cyan-700 bg-cyan-50"
                            : "hover:border-[1px] hover:border-slate-300 hover:bg-slate-100"
                        }`}
                      >
                        {country.name.common}
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>
          {inputFields.map((input) => (
            <div key={input.id} className="flex flex-col">
              <label
                htmlFor={input.id}
                className="text-clamp10 font-bold tracking-wide mb-[0.5%]"
              >
                {input.label}
              </label>
              <input
                type={input.type}
                id={input.id}
                value={formValues[input.id]}
                placeholder={input.placeholder}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                className={`text-clamp10 border-[1px]  rounded-[5px] px-[2%] py-[0.75%] mb-[1.75%] outline-none focus:ring-offset-2 focus:ring-[3px] focus:ring-cyan-600 ${
                  errors[input.id]
                    ? "border-red-700 border-[2px]"
                    : "border-slate-400"
                }`}
              />
              {errors[input.id] && (
                <>
                  <div className="flex items-center gap-2 -mt-[1%] mb-[1%] text-red-700 text-clamp6">
                    <ErrorIcon
                      style={{
                        fontSize:
                          "clamp(0.75rem, 0.5739rem + 0.7512vw, 1.25rem)",
                      }}
                    />
                    <div>{errors[input.id]}</div>
                  </div>
                </>
              )}
            </div>
          ))}
          <div className="text-clamp6 -mt-[1%] mb-[7%]">
            May be used to assist delivery
          </div>
          <div className="flex items-center gap-2 text-clamp10 tracking-wide mb-[4%]">
            <input type="checkbox" id="defaultAddress" />
            <label htmlFor="defaultAddress" className="-mb-[0.5%]">
              Use as my default address.
            </label>
          </div>
          <button className="text-clamp10 bg-yellow-400 py-[1%] px-[2.5%] rounded-[25px] mb-[7%]">
            Use this address
          </button>
        </div>
      </form>
    </>
  );
}

export default AddressForm;
