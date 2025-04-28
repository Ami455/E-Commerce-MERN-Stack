
const Address = require('../models/address.model');

// Create a new address
const createAddress = async (req, res) => {
    const Address = await Address.create(req.body);
    res.status(201).json(Address);
  
};

// Get all addresses
const getAllAddresses = async (req, res) => {
 
    const addresses = await Address.findAll();
    res.status(200).json(addresses);
  
};

// Get a single address by ID
const getAddressById = async (req, res) => {
 
    const { id } = req.params;
    const address = await Address.findByPk(id);

    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.status(200).json(address);
  
};

// Update an address
const updateAddress = async (req, res) => {
  
    const { id } = req.params;
    const address = await Address.findByPk(id);

    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    await address.update(req.body);
    res.status(200).json(address);
 
};

// Delete an address
const deleteAddress = async (req, res) => {
  
    const { id } = req.params;
    const address = await Address.findByPk(id);

    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    await address.destroy();
    res.status(200).json({ message: 'Address deleted successfully' });
 
};

module.exports = {
    createAddress,
    getAllAddresses,
    getAddressById,
    updateAddress,
    deleteAddress}
