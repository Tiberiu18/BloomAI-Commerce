import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Pagination from "./pagination";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../Redux/Actions/ProductActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import axios from 'axios';
import { setMaxPrice, setMinPrice, setCategoryFilter } from "../../Redux/Actions/FilterActions";
import EnhancedSelect from "../../data/EnhancedSelect";

const ShopSection = (props) => {
  const dispatch = useDispatch();

  // userInfo
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const {keyword, pagenumber} = props;
  const {minPrice, maxPrice} = useSelector((state) => state.priceFilter);
  const [bufferMinPrice, setBufferMinPrice] = useState(minPrice);
  const [bufferMaxPrice, setBufferMaxPrice] = useState(maxPrice);
  const [categories, setCategories] = useState([]);
  const [ctgFilter, setCtgFilter] = useState([]);

  const handleMinPriceOnChange = (e) => {
    setBufferMinPrice(e.target.value);
  };

    

  const handleMaxPriceOnChange = (e) => {
    setBufferMaxPrice(e.target.value);
  };


  const handlePriceFiltering = () => {
      dispatch(setMinPrice(bufferMinPrice));
      dispatch(setMaxPrice(bufferMaxPrice));
      dispatch(listProducts(keyword, pagenumber))
    };

  const handleResetFiltering = () => {
    dispatch(setMinPrice(0));
    dispatch(setMaxPrice(10000));
    dispatch(listProducts(keyword, pagenumber));
  }

  const handlectgFiltering = () => {
    const bufferedCtgFilterArray = ctgFilter.map(ctg => ctg.value);
    
    dispatch(setCategoryFilter(bufferedCtgFilterArray));
    dispatch(listProducts(keyword, pagenumber));
  };

    

  const handleCtgFilter = (selectedOptions) => {
    setCtgFilter(selectedOptions);
  };


  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/products/all');
      const products = response.data;
      const ctgs = products.map(flower => flower.category);
      const options = ctgs.map(name => {
        return {
          value: name,
          label: name,
        }
      });
      setCategories(options);
    } catch (error) {
      console.error('Eroare la obținerea categoriei produselor:', error);
    }
  };

  const productList = useSelector((state) => state.productList); // accesing the state from store.js
  const { loading, error, products, page, pages } = productList; // destructuring the state

  useEffect(() => {
    dispatch(listProducts(keyword, pagenumber));
    fetchCategories();
  }, [dispatch,keyword, pagenumber]);


  return (
    <>
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                { loading ? (
                  <div className="mb-5">
                    <Loading></Loading>
                  </div>
                ) : error ? (
                <Message variant="alert-danger">{error}</Message>
                ): (
                  <>

                    <div className="filters">
                        <div className="col-md-6 priceFiltering">
                          <h5>Price filtering:</h5>
                          <input
                            type="text"
                            value={bufferMinPrice}
                            onChange={handleMinPriceOnChange}
                            placeholder="Minimum price"
                          />
                          <input
                            type="text"
                            value={bufferMaxPrice}
                            onChange={handleMaxPriceOnChange}
                            placeholder="Maximum price"
                          />
                          {
                            minPrice == 0 && maxPrice == 10000 ? (
                              <button onClick={handlePriceFiltering}>Set filter</button>
                            )
                            :
                            (
                              <button onClick={handleResetFiltering}>Reset filter</button>
                            )
                          }
                          
                        </div>

                        <div className="col-md-6 ctgFiltering">
                          
                          <label htmlFor="categories">Category filter:</label>
                          <EnhancedSelect className="col-8 col-md-8" myOptions={categories} selectedOptions={ctgFilter} onChangeFunction={handleCtgFilter} />
                          <button onClick={handlectgFiltering}>Filter</button>
                        </div>
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
                    ))}
                  
                  </>
                )
                }
            
                {/* Pagination */}
                <Pagination pages={pages} page={page} keyword={keyword ? keyword: ""} />
              </div>
            </div>
          </div>
        </div>
      </div>

      
      
    </>
  );
};

export default ShopSection;
