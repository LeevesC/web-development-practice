import { createContext, useEffect, useReducer } from "react";

const CityContext = createContext();

const initialState = {
  isLoading: false,
  citiesData: [],
  currentCity: {},
  error: "",
};
function worldReducer(state, action) {
  switch (action.type) {
    case "loading": {
      return { ...state, isLoading: true };
    }
    case "initializing": {
      return { ...state, isLoading: false, citiesData: action.payload };
    }
    case "currentCity": {
      return { ...state, isLoading: false, currentCity: action.payload };
    }
    case "addCity": {
      return {
        ...state,
        isLoading: false,
        citiesData: [...state.citiesData, action.payload],
      };
    }
    case "deleteCity": {
      const newCities = state.citiesData.filter((c) => c.id !== action.payload);
      return { ...state, isLoading: false, citiesData: newCities };
    }
    case "rejected": {
      return { ...state, isLoading: false, error: action.payload };
    }

    default:
      throw new Error("Unknow action type");
  }
}

function CityProvider({ children }) {
  const [state, dispatch] = useReducer(worldReducer, initialState);

  useEffect(() => {
    async function fetchCity() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch("http://localhost:9000/cities");
        const data = await res.json();
        // console.log(data);
        dispatch({ type: "initializing", payload: data });
      } catch (error) {
        dispatch({ type: "rejected", payload: "an error laoding data..." });
        alert("There was an error loading data...");
      }
    }
    fetchCity();
  }, []);

  async function handleCurrentCity(id) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`http://localhost:9000/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "currentCity", payload: data });
      // console.log(data);
    } catch (error) {
      dispatch({ type: "rejected", payload: "an error getting city..." });
      alert("There was an error getting city...");
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`http://localhost:9000/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      // console.log(data);
      dispatch({ type: "addCity", payload: data });
    } catch (error) {
      dispatch({ type: "rejected", payload: "an error adding city..." });
      alert("There was an error adding city...");
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`http://localhost:9000/cities/${id}`, {
        method: "DELETE",
      });
      // setCitiesData((values) => values.filter((c) => c.id !== id));
      dispatch({ type: "deleteCity", payload: id });
    } catch (error) {
      dispatch({ type: "rejected", payload: "an error deleting city..." });
      alert("There was an error deleting data...");
    }
  }

  return (
    <CityContext.Provider
      value={{
        citiesData: state.citiesData,
        isLoading: state.isLoading,
        currentCity: state.currentCity,
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
