import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";


const BestSellers = (props) => {
  const dispatch = useDispatch();
  const [bestSellers, setBestSellers] = useState([]);


  
  // get all products from database by using axios and useEffect and then sort by orderCount and then slice the first 3
  const fetchBestSellers = async () => {
    const {data} = await axios.get("/api/products/all");
    const sortedProducts = data.sort((a,b) => b.orderCount - a.orderCount);
    const productsBestSellers = sortedProducts.slice(0,3);
    setBestSellers(productsBestSellers);
  };



  useEffect(() => {
    fetchBestSellers();
  }, []);




  return (
    <>
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                  <div className="bestseller col-lg-12 col-md-12 col-sm-12 text-center">
                    <h2 className="btn btn-dark btn-lg mx-2 my-2">Cele mai bine vândute</h2>

                  </div>

                    { Array.isArray(bestSellers) && 
                      bestSellers.map((product) => (
                      <div
                        className="shop col-lg-4 col-md-6 col-sm-6"
                        key={product._id}
                      >
                        <div className="border-product">
                          <Link to={`/products/${product._id}`}>
                            <div className="shopBack">
                              <img src={product.image} alt={product.name} />
                            </div>
                          </Link>
    
                          <div className="shoptext">
                            <p>
                              <Link to={`/products/${product._id}`}>
                                {product.name}
                              </Link>
                            </p>
    
                            <Rating
                              value={product.rating}
                              text={`${product.numReviews} recenzii`}
                            />
                            <h3>{product.price} lei</h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  
            
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BestSellers;
