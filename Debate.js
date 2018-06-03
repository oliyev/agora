module.exports = class Debate {

  constructor(id, user) {
    this.id = id;
    this.startStance = Math.random() >= 0.49;
    this.currentDebatingStance = this.startStance;
    this.timer = null;
    this.args = [];
    this.spectators = [];
    this.setUserStance(user);
  }

  get id() { return this._id; }
  set id(id) { this._id = id; }

  get startStance() { return this._startStance; }
  set startStance(startStance) { this._startStance = startStance; }

  get spectators() { return this._spectators; }
  set spectators(spectators) { this._spectators = spectators; }

  get debaterFor() { return this._debaterFor; }
  set debaterFor(debaterFor) { this._debaterFor = debaterFor; }

  get debaterAgainst() { return this._debaterAgainst; }
  set debaterAgainst(debaterAgainst) { this._debaterAgainst = debaterAgainst; }

  get currentDebatingStance() { return this._currentDebatingStance; }
  set currentDebatingStance(currentDebatingStance) { this._currentDebatingStance = currentDebatingStance; }

  get timer() { return this._timer; }
  set timer(timer) { this._timer = timer; }

  setUserStance(user) {
    if (this._debaterFor && this._debaterAgainst){
      this._spectators.push(user);
    }
    else{
      if (user.stance !== null){
        if (user.stance)
        this._debaterFor = user
        else
        this._debaterAgainst = user
      }
    }
  }

  start(callback) {
    if (callback)
      this.timer = setInterval(callback({id: this._id}), 1000);
  }

  stop() { clearInterval(this._timer); }

  swap() {
    this._currentDebatingStance = !this._currentDebatingStance;
    return this.currentDebatingStance;
  }
}
