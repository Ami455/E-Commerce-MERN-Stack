const FavProduct = require("../models/FavProduct.model");
const Product = require("../models/Products.model");
const Fav = require("../models/Fav.model");

// Get All Favorite Products for the User
const findFavProducts = async (req, res, next) => {
    const fav = await Fav.findOne({
        where: { userId: req.user.id }
    });

    if (!fav) {
        return res.status(404).json({ error: "Favorites not found" });
    }

    const products = await fav.getProducts();

    if (!products.length) {
        return res.status(200).json({ products: [], message: "No favorite products" });
    }

    res.status(200).json({ products });
};

// Check if a Specific Product is in Favorites
const findFavProduct = async (req, res, next) => {
    const productId = req.params.id;

    const fav = await Fav.findOne({
        where: { userId: req.user.id }
    });

    if (!fav) {
        return res.status(404).json({ error: "Favorites not found" });
    }

    const favProduct = await FavProduct.findOne({
        where: {
            FavId: fav.id,
            ProductId: productId
        }
    });

    if (!favProduct) {
        return res.status(200).json({ isFavorite: false });
    }

    res.status(200).json({ isFavorite: true });
};

// Add or remove Product to Favorites
const addRemoveProductToFav = async (req, res, next) => {
    const productId = req.params.id;

    const fav = await Fav.findOne({
        where: { userId: req.user.id }
    });

    if (!fav) {
        return res.status(404).json({ error: "Favorites not found" });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }

    const existingFavProduct = await FavProduct.findOne({
        where: {
            FavId: fav.id,
            ProductId: productId
        }
    });

    if (existingFavProduct) {
        
    await existingFavProduct.destroy();

    res.status(200).json({ message: "Product removed from favorites" });
    }

    await FavProduct.create({
        FavId: fav.id,
        ProductId: productId
    });

    res.status(201).json({ message: "Product added to favorites" });
};

// // Remove Product from Favorites
// const deleteProductFromFav = async (req, res, next) => {
//     const productId = req.params.id;

//     const fav = await Fav.findOne({
//         where: { userId: req.user.id }
//     });

//     if (!fav) {
//         return res.status(404).json({ error: "Favorites not found" });
//     }

//     const favProduct = await FavProduct.findOne({
//         where: {
//             FavId: fav.id,
//             ProductId: productId
//         }
//     });

//     if (!favProduct) {
    //         return res.status(404).json({ error: "Product not in favorites" });
    //     }
    // await favProduct.destroy();
    // res.status(200).json({ message: "Product removed from favorites" });

// };

module.exports = {
    findFavProducts,
    findFavProduct,
    addRemoveProductToFav,
    // deleteProductFromFav
};
