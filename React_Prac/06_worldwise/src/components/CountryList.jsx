import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";
import styles from "./CountryList.module.css";
import { useContext } from "react";
import { CityContext } from "../context/CityContext";

function CountryList() {
  const { citiesData, isLoading } = useContext(CityContext);

  const nullCityData = citiesData.length === 0;
  // console.log(nullCityData);
  const countries = citiesData.reduce((total, acc) => {
    if (!total.map((i) => i.country).includes(acc.country))
      return [...total, { country: acc.country, emoji: acc.emoji }];
    else return total;
  }, []);

  if (isLoading) return <Spinner />;
  if (nullCityData) return <Message message={"No Counties"} />;
  return (
    <ul className={styles.countryList}>
      {countries.map((c) => (
        <CountryItem key={c} country={c} />
      ))}
    </ul>
  );
}

export default CountryList;
