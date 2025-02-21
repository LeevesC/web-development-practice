import { createContext, useEffect, useState } from "react";

const CityContext = createContext();

function CityProvider({ children }) {
  const [citiesData, setCitiesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCity() {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:9000/cities");
        const data = await res.json();
        // console.log(data);
        setCitiesData(() => data);
        setIsLoading(false);
      } catch (error) {
        alert("There was an error loading data...");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCity();
  }, []);

  async function handleCurrentCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:9000/cities/${id}`);
      const data = await res.json();
      setCurrentCity(() => data);
      // console.log(data);
      setIsLoading(false);
    } catch (error) {
      alert("There was an error loading data...");
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:9000/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setCitiesData((value) => [...value, data]);
    } catch (error) {
      alert("There was an error loading data...");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:9000/cities/${id}`, {
        method: "DELETE",
      });
      setCitiesData((values) => values.filter((c) => c.id !== id));
    } catch (error) {
      alert("There was an error delete data...");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CityContext.Provider
      value={{
        citiesData,
        isLoading,
        currentCity,
        handleCurrentCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

export { CityProvider, CityContext };
