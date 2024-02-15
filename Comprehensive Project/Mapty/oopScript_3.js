import { Running, Cycling } from "./data.js";

const ul = document.querySelector(".workouts");

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

class Mapty {
  #map;
  #mapEvent;
  #workouts = new Array();

  constructor() {
    this._getPosition();
    form.addEventListener("submit", this._newWorkout.bind(this));
    selectOption.addEventListener("change", this._toggleEvent);
    ul.addEventListener("click", this._moveMarker.bind(this));
  }

  // ----  ----
  _getPosition() {
    if (!navigator.geolocation) {
      alert("GeoLocation is not available on your browser.");
    } else {
      console.log("loading...");
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        (err) => {
          console.log("error to location");
        }
      );
    }
  }
  // ---- callback function for loading map ----
  _loadMap(position) {
    const { latitude, longitude } = position.coords;

    this.#map = L.map("map").setView([latitude, longitude], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.#map);

    this.#map.on("click", this._showForm.bind(this));
  }
  // ---- callback function for showing form ----
  _showForm(e) {
    this.#mapEvent = e;
    form.classList.remove("hidden");
    inputs.forEach((input) => (input.value = ""));
    inputDistance.focus();
  }
  // ---- callback function for toggle ----
  _toggleEvent() {
    inputCadence.closest("div").classList.toggle("form__row--hidden");
    inputElev.closest("div").classList.toggle("form__row--hidden");

    inputs.forEach((input) => (input.value = ""));
  }
  // ---- callback function for creating new workout ----
  _newWorkout(e) {
    e.preventDefault();

    if (this._checkForm()) {
      console.log("form created");
      const { lat, lng } = this.#mapEvent.latlng;
      this._workoutDate(this.#mapEvent.latlng);
      this._renderUI(this.#workouts.at(-1));

      inputs.forEach((input) => (input.value = ""));
    } else {
      alert("Fill in valid value for all blanks.");
    }
  }

  // ---- check the formatting ----
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

  // ---- create workout instance ----
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

  // ---- render UI ----
  _renderUI(workoutData) {
    const { lat, lng } = workoutData._coords;
    const date = new Date(workoutData._id);
    const month = months.at(date.getMonth());
    const day = date.getDate();
    let html = `
    <li class="workout workout--${workoutData._name}" data-id=${
      workoutData._id
    }>
    <h2 class="workout__title">${workoutData._name.toUpperCase()} on ${month} ${day}</h2>
    <div class="workout__details">
      <span class="workout__icon">${
        workoutData._name === "running" ? "🏃‍♂️" : "🚴‍♀️"
      }</span>
      <span class="workout__value">${workoutData._distance}</span>
      <span class="workout__unit">km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⏱</span>
      <span class="workout__value">${workoutData._duration}</span>
      <span class="workout__unit">min</span>
    </div>
    `;
    if (workoutData._name === "running") {
      html += `
      <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workoutData._pace}</span>
        <span class="workout__unit">min/km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">🦶🏼</span>
        <span class="workout__value">${workoutData._cadence}</span>
        <span class="workout__unit">spm</span>
      </div>
    </li>
  `;
    } else {
      html += `
      <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workoutData._speed}</span>
        <span class="workout__unit">min/km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⛰</span>
        <span class="workout__value">${workoutData._elevationGain}</span>
        <span class="workout__unit">m</span>
      </div>
    </li>
  `;
    }

    form.insertAdjacentHTML("afterend", html);

    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          autoClose: false,
          closeOnClick: false,
          className: `${workoutData._name}-popup`,
        })
      )
      .setPopupContent(
        `${workoutData._name === "running" ? "🏃‍♂️" : "🚴‍♀️"} ${
          workoutData._name.charAt(0).toUpperCase() + workoutData._name.slice(1)
        } on ${month} ${day}`
      )
      .openPopup();

    form.style.display = "none";
    form.classList.add("hidden");
    setTimeout(() => (form.style.display = "grid"), 1000);
  }

  _moveMarker(e) {
    const liCard = e.target.closest("li");
    if (!liCard?.classList.contains("workout")) return;

    const targetID = liCard?.dataset.id;
    const targetMark = this.#workouts.find(
      (ele) => String(ele._id) === targetID
    );
    console.log(targetMark._coords);
    this.#map.panTo(targetMark._coords);
  }
}

// ------------------ main thread --------------------
const app = new Mapty();
