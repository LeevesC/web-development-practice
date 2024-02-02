class Workout {
  constructor(distance, duration, coords) {
    this._distance = distance;
    this._duration = duration;
    this._coords = coords;
    this._id = this.idGenerator();
  }

  idGenerator() {
    const dateStamp = Date.now();
    return dateStamp;
  }
}

class Running extends Workout {
  constructor(distance, duration, coords, cadence) {
    super(distance, duration, coords);
    this._cadence = cadence;
    this._pace = (this._distance / this._duration).toFixed(1);
    this._name = "running";
  }
}

class Cycling extends Workout {
  constructor(distance, duration, coords, elevationGain) {
    super(distance, duration, coords);
    this._elevationGain = elevationGain;
    this._speed = (this._distance / this._duration).toFixed(1);
    this._name = "cycling";
  }
}

export { Workout, Running, Cycling };
