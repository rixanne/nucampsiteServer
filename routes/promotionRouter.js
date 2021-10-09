const express = require('express');
const Promotion = require('../models/promotion');

const promotionRouter = express.Router();

promotionRouter
  .route('/')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
  })
  .get((req, res, next) => {
    Promotion.find()
      .then((promotions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(
          `Will send all the promotions to you: ${req.body.name} with description: ${req.body.description}\n`
        );
        res.json(campsites);
      })
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Promotion.create(req.body)
      .then((promotion) => {
        console.log('Promotion Created ', promotion);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(
          `Will add the promotion: ${req.body.name} with description: ${req.body.description}`
        );
        res.json(campsite);
      })
      .catch((err) => next(err));
  })

  .put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
  })

  .delete((req, res, next) => {
    Promotion.deleteMany()
      .then((response) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(`Deleting all promotions`);
        res.json(response);
      })
      .catch((err) => next(err));
  });

promotionRouter
  .route('/:promotionId')
  .get((req, res, next) => {
    Promotion.findById(req.params.promotionId)
      .then((campsite) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(`Will send details of the promotion: ${req.params.campsiteId} to you`);
        res.json(promotion);
      })
      .catch((err) => next(err));
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /promotions/${req.params.promotionId}`);
  })
  .put((req, res, next) => {
    Promotion.findByIdAndUpdate(
      req.params.promotionId,
      {
        $set: req.body
      },
      { new: true }
    )
      .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(`Will update the promotion: ${req.body.name}
        with description: ${req.body.description}\n`);
        res.json(promotion);
      })
      .catch((err) => next(err));
  })

  .delete((req, res, next) => {
    Campsite.findByIdAndDelete(req.params.campsiteId)
      .then((response) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(`Deleting promotion: ${req.params.promotionId}`);
        res.json(response);
      })
      .catch((err) => next(err));
  });

module.exports = promotionRouter;
