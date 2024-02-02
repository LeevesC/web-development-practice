// -------- DOM elements --------
const form = document.querySelector(".form");
const workouts = document.querySelector(".workouts");
const inputs = form.querySelectorAll("input");

const inputDistance = form.querySelector(".form__input--distance");
const inputDuration = form.querySelector(".form__input--duration");
const inputCadence = form.querySelector(".form__input--cadence");
const inputElev = form.querySelector(".form__input--elevation");

const selectOption = form.querySelector(".form__input--type");

// ----- main Class -----
class Map {
  #map;

  constructor(latitude, longitude) {
    this._latitude = latitude;
    this._longitude = longitude;
    this.initMap(this._latitude, this._longitude);
    this.onMapClick();
    this.selectCheck();
  }

  // initializing map
  initMap(latitude, longitude) {
    this.#map = L.map("map").setView([`${latitude}`, `${longitude}`], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.#map);
  }

  // event on #map
  onMapClick() {
    this.#map.on("click", (e) => {
      const { lat, lng } = e.latlng;
      form.classList.remove("form__row--hidden");
      // console.log(`onMapClick ${this.#currentLat}, ${this.#currentLng}`);
      this.onFormSub(lat, lng);
    });
  }

  // event on HTML form
  onFormSub(lat, lng) {
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(`onFormSub ${lat}, ${lng}`);
      if (this.checkForm()) {
        this.workoutInfo(lat, lng);
        console.log("form created");
        form.classList.add("form__row--hidden");
        inputs.forEach((input) => (input.value = ""));
        // Remove the event listener after execution
        form.removeEventListener("submit", handleSubmit);
      } else {
        alert("Please fill out with valid number.");
      }
    };

    // Add the event listener to the form
    form.addEventListener("submit", handleSubmit);
  }

  // workout card and marker on map
  workoutInfo(lat, lng) {
    workouts.insertAdjacentHTML(
      "beforeend",
      `<li class="workout workout--running" data-id="1234567890">
        <h2 class="workout__title">Running on April 14</h2>
        <div class="workout__details">
          <span class="workout__icon">🏃‍♂️</span>
          <span class="workout__value">5.2</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">24</span>
          <span class="workout__unit">min</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">4.6</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">178</span>
          <span class="workout__unit">spm</span>
        </div>
      </li>`
    );
    console.log(`workoutInfo ${lat}, ${lng}`);
    this.addMaker(lat, lng);
  }

  // adding a marker
  addMaker(latitude, longitude) {
    console.log(`addMaker ${latitude}, ${longitude}`);
    const marker = L.marker([`${latitude}`, `${longitude}`]).addTo(this.#map);
    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup().autoClose(false);
  }

  // type selection
  selectCheck() {
    selectOption.addEventListener("change", () => {
      if (selectOption.value === "running") {
        inputCadence.closest("div").classList.remove("form__row--hidden");
        inputElev.closest("div").classList.add("form__row--hidden");
      } else {
        inputCadence.closest("div").classList.add("form__row--hidden");
        inputElev.closest("div").classList.remove("form__row--hidden");
      }
      inputs.forEach((input) => (input.value = ""));
    });
  }

  // check form value
  checkForm() {
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
}

// ----- get current position -----
const getGeo = function () {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation)
      reject("Geolocation is not supported by this browser.");
    else {
      console.log("loading...");
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          resolve([latitude, longitude]);
        },
        (err) => {
          reject("Error Code = " + err.code + " - " + err.message);
        }
      );
    }
  });
};

// --------- main code ---------

getGeo()
  .then((location) => {
    console.log("Geo location accomplished");
    const [lat, lng] = location;

    const mapity = new Map(lat, lng);
  })
  .catch((error) => console.log(error));
