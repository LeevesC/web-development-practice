// Challenge 1
// class a Car, has a make and a speed property(current speed in km/h).
// accelerate method, increase the car's speed by 10, and log the new speed to the console.
// brake method, decrease the car's speed by 5, log the new speed.
// create 2 car objects

// Challenge 2
// getter called 'speedUS' returns the current speed in mi/h (divide by 1.6)
// setter called 'speedUS' sets the current speed (multiplying the input by 1.6)

// Challenge 3
// class a Electric Car (EV) as a child of Car. Besides a make and current speed, 'charge' property.
// chargeBattery method, sets the battery charge to 'chargeTo'
// accelerate method, increase the car's speed by 20, and decrease the charge by 1%. and log.
// 

// Challenge 4
// make the 'charge' property private;
// to chain the 'accelerate' and 'chargeBattery' methods, and update the 'brake' method to chining.


class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`The ${this.make} car's current speed is ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`The ${this.make} car's current speed is ${this.speed} km/h`);
    return this;
  }

  get speedUS() {
    return this.speed/1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EV extends Car {
  #charge
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    console.log(`the current charge is ${this.#charge}`);
  }

  accelerate() {
    this.speed += 20;
    this.#charge -= 1;
    console.log(`${this.make} going at ${this.speed} km/h, with a charge of ${this.#charge}%`);
    return this;
  }

  get getCharge() {
    return this.#charge;
  }

}
// ----------- test others ----------
const form = document.querySelector(".form");
const workouts = document.querySelector(".workouts");
const inputs = form.querySelectorAll("input");

const addHtml = function() {
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
  
}

const inputDistance = form.querySelector('.form__input--distance');
const inputDuration = form.querySelector('.form__input--duration');
const inputCadence = form.querySelector('.form__input--cadence');
const inputElev = form.querySelector('.form__input--elevation')

const selectOption = form.querySelector('.form__input--type');

form.classList.remove('form__row--hidden');
form.addEventListener('submit', (e)=>{
  e.preventDefault();
})

selectOption.addEventListener('change', () => {
  if(selectOption.value === 'running') {
    inputCadence.closest('div').classList.remove('form__row--hidden');
    inputElev.closest('div').classList.add('form__row--hidden');
  } else {
    inputCadence.closest('div').classList.add('form__row--hidden');
    inputElev.closest('div').classList.remove('form__row--hidden');
  }
})

const checkForm = function() {
  if (inputDistance.value > 0 && inputDuration.value > 0 && inputCadence.value > 0) return true
  return false;
}

// if (!checkForm()) {
//   alert('Please enter valid value.');
// } else {
//   addHtml();
//   inputs.forEach(input => input.value = '');
// }

console.log(selectOption.value)