import { useState, useEffect } from "react";

const useFetchCountry = () => {
  // State for storing country name
  const [country, setCountry] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to fetch country information
    const fetchCountry = async () => {
      try {
        // Fetch data from ipapi.co API
        const response = await fetch("https://ipapi.co/json/");
        if (!response.ok) {
          throw new Error("Failed to fetch country information");
        }
        const data = await response.json();
        setCountry(data.country_name);
      } catch {
        setError("Failed to fetch country information");
      }
    };

    fetchCountry();
  }, []);

  return { country, error };
};

export default useFetchCountry;
