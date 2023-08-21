import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Rating from "./Rating";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { listSuggestedProducts } from '../../Redux/Actions/ProductActions';

const SuggestionSection = () => {
    const dispatch = useDispatch();
    // grab top 5 products from backend, route is /api/ai/recommend, use axios
    const {userInfo} = useSelector(state => state.userLogin);
    // get suggested products state
    const {loading, error, products} = useSelector(state => state.suggestedProducts);
    


    useEffect(()=>{
      if(userInfo)
      {
        dispatch(listSuggestedProducts(userInfo._id));
      }
    },[dispatch,userInfo])

    return (
        <>
        <div className="container">
          <div className="section">
            <div className="row">
              <div className="col-lg-12 col-md-12 article">
                <div className="shopcontainer row">
        {
          loading ? (
            <div className="mb-5">
                    <Loading></Loading>
            </div>
          ):
          error ? (
            <Message variant="alert-danger">{error}</Message>
          )
          : userInfo && 
          (
              <>
              <div className="bestseller col-lg-12 col-md-12 col-sm-12 text-center">
                  <h2 className="btn btn-dark btn-lg mx-2 my-2">Noi îți recomandăm...</h2>

              </div>
            { Array.isArray(products) && 
                products.map((product) => (
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
                        text={`${product.numReviews} reviews`}
                      />
                      <h3>{product.price} lei</h3>
                    </div>
                  </div>
                </div>
              ))
            }
            </>
            
          )
        }
                  </div>
                </div>
              </div>
            </div>
        </div>

            
    </>
    );

  
}


export default SuggestionSection;