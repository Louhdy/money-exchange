const { response, request } = require("express");
const ExchangeService = require("../services/exchange");
const exchangeService = new ExchangeService();

const newExchange = async (req = response, res = request, next) => {
  try {
    const { body, user: { id: id_usuario } } = req;

    const exchange = await exchangeService.create(body, id_usuario);

    return res.status(201).json({
      success: true,
      message: "New exchange created successfully",
      exchange,
    });
  } catch (error) {
    next(error);
  }
};

const listExchange = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const data = await exchangeService.find(userId);
    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getDetailExchange = async (req, res, next) => {
  try {
    const { user: { id: userId }, params: { id: exchangeId } } = req;
    const data = await exchangeService.findOne(exchangeId, userId);
    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const deleteExchange = async (req, res, next) => {
  try {
    const { user: { id: userId }, params: { id: exchangeId } } = req;
    await exchangeService.delete(exchangeId, userId);
    return res.json({
      success: true,
      message: "Exchange request deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newExchange,
  listExchange,
  getDetailExchange,
  deleteExchange,
};
