import { Address } from "../models/address.model.js";
import { User } from "../models/user.model.js";

export const createAddress = async (req, res) => {
  try {
    const address = await Address.create({ ...req.body, user: req.user._id });

    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { addresses: address._id } },
      { new: true }
    );

    res.status(201).json({ success: true, address });
  } catch (error) {
    console.log("Error in createAddress function", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user._id });
    res.status(200).json({ success: true, addresses });
  } catch (error) {
    console.log("Error in getUserAddresses function", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAddressById = async (req, res) => {
  try {
    const address = await Address.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!address)
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    res.status(200).json({ success: true, address });
  } catch (error) {
    console.log("Error in getAddressById function", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const upadateAddress = async (req, res) => {
  try {
    const address = await Address.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!address)
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    res.status(200).json({ success: true, address });
  } catch (error) {
    console.log("Error in upadateAddress function", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!address)
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    res.status(200).json({ success: true, message: "Address deleted" });
  } catch (error) {
    console.log("Error in deleteAddress function", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
