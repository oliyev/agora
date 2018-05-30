module.exports = class Debate {

  constructor(id) {
    this.id = id;
    this.startStance = Math.random() >= 0.49;
    this.currentDebatingStance = this.startStance;
    this.timer = null;
    this.args = [];
  }

  get id() { return this._id; }
  set id(id) { this._id = id; }

  get startStance() { return this._startStance; }
  set startStance(startStance) { this._startStance = startStance; }

  get currentDebatingStance() { return this._currentDebatingStance; }
  set currentDebatingStance(currentDebatingStance) { this._currentDebatingStance = currentDebatingStance; }

  get timer() { return this._timer; }
  set timer(timer) { this._timer = timer; }

  start(callback) { timer = setInterval(callback({id: this._id}), 1000); }

  stop() { clearInterval(this._timer); }

  swap() {
    this._currentDebatingStance = !this._currentDebatingStance;
    return this.currentDebatingStance;
  }
}
