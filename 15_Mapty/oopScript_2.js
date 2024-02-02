import { Running, Cycling } from "./data.js";
const workoutsLi = document.querySelector(".workouts");

const form = document.querySelector(".form");
const inputs = form.querySelectorAll("input");
const inputDistance = form.querySelector(".form__input--distance");
const inputDuration = form.querySelector(".form__input--duration");
const inputCadence = form.querySelector(".form__input--cadence");
const inputElev = form.querySelector(".form__input--elevation");

const selectOption = form.querySelector(".form__input--type");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// --------------------- App Class ----------------------
class Mapty {
  #map;
  #mapEvent;
  #workouts = new Array();

  constructor() {
    this._initMap();
    this._formSubmitEvent();
    this._toggleEvent();
  }

  _initMap() {
    if (!navigator.geolocation) {
      alert("GeoLocation is not available on your browser.");
    } else {
      console.log("loading...");
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;

          this.#map = L.map("map").setView([latitude, longitude], 13);
          L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution:
              '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          }).addTo(this.#map);

          this.#map.on("click", (e) => {
            this.#mapEvent = e;
            form.classList.remove("hidden");
            inputs.forEach((input) => (input.value = ""));
            inputDistance.focus();
          });
        },
        (err) => {
          console.log("error to location");
        }
      );
    }
  }

  _formSubmitEvent() {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this._checkForm()) {
        console.log("form created");
        const { lat, lng } = this.#mapEvent.latlng;
        this._workoutDate(this.#mapEvent.latlng);
        this._workoutCard();
        this._workoutMarker();

        inputs.forEach((input) => (input.value = ""));
      } else {
        alert("Fill in valid value for all blanks.");
      }
    });
  }

  _toggleEvent() {
    selectOption.addEventListener("change", () => {
      inputCadence.closest("div").classList.toggle("form__row--hidden");
      inputElev.closest("div").classList.toggle("form__row--hidden");

      inputs.forEach((input) => (input.value = ""));
    });
  }

  _checkForm() {
    if (selectOption.value === "running") {
      if (
        inputDistance.value > 0 &&
        inputDuration.value > 0 &&
        inputCadence.value > 0
      )
        return true;
    } else {
      if (
        inputDistance.value > 0 &&
        inputDuration.value > 0 &&
        inputElev.value > 0
      )
        return true;
    }
    return false;
  }

  _workoutDate(coords) {
    const toddleValue =
      selectOption.value === "running" ? inputCadence.value : inputElev.value;

    const workout =
      selectOption.value === "running"
        ? new Running(
            inputDistance.value,
            inputDuration.value,
            coords,
            toddleValue
          )
        : new Cycling(
            inputDistance.value,
            inputDuration.value,
            coords,
            toddleValue
          );

    this.#workouts.push(workout);
    console.log(this.#workouts);
  }

  _workoutMarker() {
    const data = this.#workouts.at(-1);
    const {lat, lng} = data._coords;
    const date = new Date(data._id);
    const month = months.at(date.getMonth());
    const day = date.getDate();

    L.marker([lat, lng])
    .addTo(this.#map)
    .bindPopup(
      L.popup({
        autoClose: false,
        closeOnClick: false,
        className: `${data._name}-popup`,
      })
    )
    .setPopupContent(`${data._name === "running" ? "🏃‍♂️" : "🚴‍♀️"} ${data._name.charAt(0).toUpperCase() + data._name.slice(1)} on ${month} ${day}`)
    .openPopup();
  }

  _workoutCard() {
    const data = this.#workouts.at(-1);
    const date = new Date(data._id);
    const month = months.at(date.getMonth());
    const day = date.getDate();

    let html = `<li class="workout workout--${data._name}" data-id=${data._id}>
    <h2 class="workout__title">${data._name.toUpperCase()} on ${month} ${day}</h2>
    <div class="workout__details">
      <span class="workout__icon">${
        data._name === "running" ? "🏃‍♂️" : "🚴‍♀️"
      }</span>
      <span class="workout__value">${data._distance}</span>
      <span class="workout__unit">km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⏱</span>
      <span class="workout__value">${data._duration}</span>
      <span class="workout__unit">min</span>
    </div>
    `;

    if (data._name === "running") {
      html += `
      <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${data._pace}</span>
        <span class="workout__unit">min/km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">🦶🏼</span>
        <span class="workout__value">${data._cadence}</span>
        <span class="workout__unit">spm</span>
      </div>
    </li>
  `;
    } else {
      html += `
      <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${data._speed}</span>
        <span class="workout__unit">min/km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⛰</span>
        <span class="workout__value">${data._elevationGain}</span>
        <span class="workout__unit">m</span>
      </div>
    </li>
  `;
    }

    workoutsLi.insertAdjacentHTML("beforeend", html);
    form.classList.add("hidden");
  }
}

// -------------------- Main thread -----------------------

const app = new Mapty();
