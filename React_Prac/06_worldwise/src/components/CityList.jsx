import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import styles from "./CityList.module.css";
import { useContext } from "react";
import { CityContext } from "../context/CityContext";

function CityList() {
  const { isLoading, citiesData } = useContext(CityContext);
  const nullCityData = citiesData.length === 0;
  // console.log(nullCityData);

  if (isLoading) return <Spinner />;
  if (nullCityData) return <Message message={"No cities"} />;
  return (
    <ul className={styles.cityList}>
      {citiesData.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
