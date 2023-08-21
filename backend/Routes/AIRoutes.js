import express from 'express';
import asyncHandler from 'express-async-handler';
import User from '../Models/UserModel.js';
import protect from '../Middleware/AuthMiddleware.js';
import Order from '../Models/OrderModel.js';
import Product from '../Models/ProductModel.js';
const AIRoutes = express.Router();

async function recommendTop5Products(userId){
    try{
        const currentUser = await User.findById(userId);

        const userCluster = currentUser.cluster;

        const usersInCluster = await User.find({cluster: userCluster});


        const productsInCluster = [];

        const ordersOfUsersInCluster = await Order.find({user: {$in: usersInCluster}});
        // add all products in cluster to productsInCluster
        ordersOfUsersInCluster.forEach((order) => {
            order.orderItems.forEach((orderItem) => {
                productsInCluster.push(orderItem);
            });
        });


        
        // remove duplicate products based on name
        const uniqueProductsInCluster = [];
        productsInCluster.forEach((product) => {
            if(!uniqueProductsInCluster.some((uniqueProduct) => uniqueProduct.name === product.name)){
                uniqueProductsInCluster.push(product);
            }
        }); 


        // now create a new array with the original products so we can access all the attributes
        for(let i = 0; i < uniqueProductsInCluster.length; i++){
            const product = await Product.findById(uniqueProductsInCluster[i].product);
            uniqueProductsInCluster[i] = product;
        }


        
        // sort products by orderCount
        uniqueProductsInCluster.sort((a, b) => (a.orderCount > b.orderCount) ? -1 : 1);


        // return top 5 products, if there are less than 5 products, return all
        if(uniqueProductsInCluster.length > 5){
            return uniqueProductsInCluster.slice(0, 5);
        }
        else{
            return uniqueProductsInCluster;
        }
    }
    catch(err){
        console.log(err);
    }
}

AIRoutes.get("/recommend/:id", protect, asyncHandler(async(req, res) => {
    const userId = req.user._id;
    try{
        const recommendedProducts = await recommendTop5Products(userId);
        res.json(recommendedProducts);
    }
    catch(err){
        console.log(err);
    }

}));




export default AIRoutes;