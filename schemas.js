const Joi = require("joi");

module.exports.campgroundSchema = Joi.object({
  campground: {
    title: Joi.string().required(),
    price: Joi.number().min(0).required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    images: {
      url: Joi.string().required(),
      filename: Joi.string().required(),
    },
  },
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required(),
    body: Joi.string().required(),
  }).required(),
});
