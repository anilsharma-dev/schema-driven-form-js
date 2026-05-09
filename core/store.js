export const store = {

  data: {},

  set(key, value) {
    this.data[key] = value;
    console.log("STATE:", this.data);
  },

  get(key) {
    return this.data[key];
  },
  remove(key) {

    delete this.data[key];
    
    console.log("REMOVED:", key);
    console.log("STATE:", this.data);
  }
};