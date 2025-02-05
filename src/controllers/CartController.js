
const Cart = require("../models/Cart");
const { Op } = require('sequelize');


const index = async (req, res) => {
  try {
    const carts = await Cart.findAll();
    return res.status(200).json({ carts });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const show = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.findByPk(id);
    if (!cart) return res.status(404).json({ message: "Carrinho não encontrado" });
    return res.status(200).json({ cart });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const newCart = await Cart.create(req.body);
    return res.status(201).json({ message: "Carrinho criado com sucesso", cart: newCart });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Cart.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ message: "Carrinho não encontrado" });
    const updatedCart = await Cart.findByPk(id);
    return res.status(200).json({ cart: updatedCart });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Cart.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: "Carrinho não encontrado" });
    return res.status(200).json({ message: "Carrinho deletado com sucesso" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { index, show, create, update, destroy };
