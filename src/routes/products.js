"use strict";

const { celebrate, Joi } = require("celebrate");
const passport = require("passport");

const utilities = require("../utilities");
const controller = require("../controllers");

const productController = controller.products;
const { createErrorObject } = utilities.utils;

const addProduct = {
  path: "/api/v1/products",
  validation: {
    body: Joi.object().keys({
      productName: Joi.string()
        .trim()
        .required(),
      productCode: Joi.string()
        .trim()
        .required(),
      description: Joi.string()
        .trim()
        .required(),
      price: Joi.number().required()
    })
  }
};

const getProduct = {
  path: "/api/v1/products",
  validation: {
    query: Joi.object().keys({
      _id: Joi.string()
        .trim()
        .optional()
    })
  }
};

module.exports = app => {
  app.post(
    addProduct.path,
    celebrate(addProduct.validation),
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      try {
        const user = req.user;
        const payload = req.body;
        const successResponse = await productController.addProduct(
          payload,
          user
        );
        res
          .status(successResponse.httpStatusCode)
          .json(successResponse.details);
      } catch (e) {
        let error = e;
        if (!e.details) error = createErrorObject();
        res.status(error.httpStatusCode).json(error.details);
      }
    }
  );

  app.get(
    getProduct.path,
    celebrate(getProduct.validation),
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      try {
        const user = req.user;
        const payload = req.query;
        const successResponse = await productController.getProduct(
          payload,
          user
        );
        res
          .status(successResponse.httpStatusCode)
          .json(successResponse.details);
      } catch (e) {
        console.log(e);
        let error = e;
        if (!e.details) error = createErrorObject();
        res.status(error.httpStatusCode).json(error.details);
      }
    }
  );
};