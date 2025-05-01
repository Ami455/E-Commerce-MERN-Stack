
const Address = require('../models/address.model');
const User = require('../models/user.model');

// Create a new address
const createAddress = async (req, res) => {
  const {street, city, postalCode , country}= req.body
  const userId = req.user.id
  const user = await User.findByPk(userId)
  if(!user){ res.status(404).json({error:"login error"});}
    const address = await Address.create({street, city, postalCode , country});
    if(!address){ res.status(404).json({error: "error creating an address"});}
    await address.setUser(user)

    res.status(201).json(address);
  
};

// Get all addresses
const getAllAddresses = async (req, res) => {
  const userId=req.user.id
  const addresses = await Address.findAll( {where: { userId } });
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
  const {street, city, postalCode , country}= req.body
    const { id } = req.params;
    console.log(id)
    const address = await Address.findByPk(id);

    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    await address.update({street, city, postalCode , country});
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
