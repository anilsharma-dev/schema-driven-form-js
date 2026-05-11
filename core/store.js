export const store = {

  data: {},


  //  set value
  set(key, value) {

    this.data[key] = value;

    console.log("STATE:", this.data);
  },


  //  get value
  get(key) {

    return this.data[key];
  },


  //  remove hidden field
  remove(key) {

    delete this.data[key];

    console.log("REMOVED:", key);
  },


  // reset full form state
  reset() {

    this.data = {};

    console.log("STORE RESET");
  }
};