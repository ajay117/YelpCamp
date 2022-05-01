const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const images = require("./images");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany();
  for (let i = 0; i < 50; i++) {
    const randomImage = images[Math.floor(Math.random() * 3)];
    const random1000 = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      author: "625ba6d17e6b079e06724dbf",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      price: 5,
      geometry: {
        type: "Point",
        coordinates: [-113.1331, 47.0202],
      },
      images: [
        {
          url: "https://res.cloudinary.com/yelpcamp619/image/upload/v1651271207/YelpCamp/nbnz9chjb53uxspktg5a.jpg",
          filename: "YelpCamp/nbnz9chjb53uxspktg5a",
        },
        {
          url: "https://res.cloudinary.com/yelpcamp619/image/upload/v1651271207/YelpCamp/xjyvv2mjrgceozjb7mxh.jpg",
          filename: "YelpCamp/xjyvv2mjrgceozjb7mxh",
        },
      ],
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
