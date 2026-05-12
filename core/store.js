const STORAGE_KEY = "dynamic-form-engine";

export const store = {

  //  load initial data from localStorage
  data: JSON.parse(
    localStorage.getItem(STORAGE_KEY)
  ) || {},



  //  set value
  set(key, value) {

    this.data[key] = value;

    //  persist to localStorage
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(this.data)
    );

    console.log("STATE:", this.data);
  },



  //  get value
  get(key) {

    return this.data[key];
  },



  //  remove hidden field
  remove(key) {

    delete this.data[key];

    //  update storage
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(this.data)
    );

    console.log("REMOVED:", key);
  },



  //  reset form
  reset() {

    this.data = {};

    //  clear storage
    localStorage.removeItem(STORAGE_KEY);

    console.log("STORE RESET");
  }
};