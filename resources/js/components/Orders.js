import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function Orders() {
    const [orders, setOrders] = useState([]);
    const search = useRef();
    const sortBy = useRef();
    const sortOrder = useRef();

    useEffect(async () => {
        const gOrders = await axios.get("/api/orders");
        setOrders(gOrders.data);
    }, []);

    const cancelOrder = async (id) => {
        const res = await axios.post(`/api/cancel/${id}`);
        if (res.data.flg === 1) {
            let newOrder = [...orders];
            let idx = newOrder.findIndex((items) => items.id === id);
            newOrder[idx].is_cancelled = 1;
            setOrders(newOrder);
        }
    };

    const searchFilt = async () => {
        let params = {
            search: search.current.value,
            sortBy: sortBy.current.value,
            sortOrder: sortOrder.current.value,
        };

        const res = await axios.get("/api/orders", { params });
        setOrders(res.data);
        // console.log(res.data);
    };

    return (
        <div className="card">
            <div className="card-header">
                <h1 className="card-title">My Orders</h1>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-sm-3">
                        <label>Search</label>
                        <input
                            className="form-control"
                            name="search"
                            type="text"
                            ref={search}
                            placeholder="Search customer or order"
                        />
                    </div>
                    <div className="col-sm-2">
                        <label>Sort By</label>
                        <select
                            className="form-select"
                            name="sortBy"
                            ref={sortBy}
                        >
                            <option value="">None</option>
                            <option value="cust_name">Customer</option>
                            <option value="order_code">Order</option>
                            <option value="total_sales">Sales</option>
                        </select>
                    </div>
                    <div className="col-sm-2">
                        <label>Sort Order</label>
                        <select
                            className="form-select"
                            name="sortOrder"
                            ref={sortOrder}
                        >
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
                    <div className="col-sm-3">
                        <br />
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={searchFilt}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Customer Name</th>
                            <th>Order Number</th>
                            <th>Gross Sales</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((item, index) => (
                            <tr key={`O_${item.id}`}>
                                <td>{item.cust_name}</td>
                                <td>{item.order_code}</td>
                                <td>{item.total_sales}</td>
                                <td>
                                    {item.is_cancelled === 1 ? (
                                        "Cancelled"
                                    ) : (
                                        <>
                                            <Link
                                                to={`/order-detail/${item.id}`}
                                                className="btn btn-outline-secondary btn-sm"
                                            >
                                                Edit
                                            </Link>
                                            &nbsp;
                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() =>
                                                    cancelOrder(item.id)
                                                }
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Orders;
