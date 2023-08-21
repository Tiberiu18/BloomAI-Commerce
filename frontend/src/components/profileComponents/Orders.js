import React from "react";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import moment from "moment";
import { Link } from "react-router-dom";
const Orders = (props) => {

  const {loading, error, orders} = props;
  return (
    <div className=" d-flex justify-content-center align-items-center flex-column">
      {
        loading ? (<Loading></Loading>): error ? (
          <Message variant="alert-danger">{error}</Message>
        ) :
        (
          <>
          {orders.length === 0 ? (
            <div className="col-12 alert alert-info text-center mt-3">
            Nicio comandă înregistrată
            <Link
              className="btn btn-success mx-2 px-3 py-2"
              to="/"
              style={{
                fontSize: "12px",
              }}
            >
              Începe cumpărăturile
            </Link>
          </div>
          )
          :
          (
            <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>STATUS</th>
              <th>DATA</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {
              orders.map((order) => ( 
                <tr className={`${order.isPaid} ? "alert-success" : "alert-danger"`} key = {order._id}> 
              <td>
                <a href={`/order/${order._id}`} className="link">
                  {order._id}
                </a>
              </td>
              <td>{order.isDelivered ? <>Livrată</> : <>Nelivrată</>}</td>
              <td>{order.isPaid? moment(order.paidAt).format('DD/MM/YYYY') : moment(order.createdAt).format('DD/MM/YYYY')}</td>
              <td>{order.totalPrice} lei</td>
            </tr>
              ))
            }
            
           
              
          </tbody>
        </table>
      </div>
          )
}
          </>
        )
      }

      
    </div>
  );
};

export default Orders;
