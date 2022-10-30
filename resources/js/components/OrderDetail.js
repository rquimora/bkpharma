import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function OrderDetail() {
    const nav = useNavigate();
    const { orderId } = useParams();

    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [total, setTotal] = useState(0);
    const [custname, setCustname] = useState("");
    const qty = useRef();
    const code = useRef();

    useEffect(async () => {
        const prod = await axios.get("/api/products");
        setProducts(prod.data);

        const cust = await axios.get("/api/customers");
        setCustomers(cust.data);

        if (orderId !== undefined) {
            try {
                const orDtl = await axios.get(`/api/edit/${orderId}`);
                setCustname(orDtl.data.customer_id);
                setOrders(orDtl.data.orders);
                console.log(orDtl);
            } catch (error) {
                console.log(error.response.data.message);
                nav("/");
            }
        }

        console.log(orderId);
    }, []);

    useEffect(() => {
        let newTotal = orders.reduce((acc, item) => parseFloat(acc) + parseFloat(item.gross), 0);
        setTotal(newTotal);
    }, [orders]);

    const addOrder = () => {
        let nCode = code.current.value;
        let nProd = products.find(
            (item) => parseInt(item.id) === parseInt(nCode)
        );
        let nQty = qty.current.value;

        if (nProd && nQty) {
            nProd.qty = parseFloat(nQty);
            nProd.gross = parseFloat(nProd.price) * parseFloat(nProd.qty);

            let newOrders = [...orders];
            newOrders.push(nProd);
            setOrders(newOrders);
        }
    };

    const removeOrder = (rowIndex) => {
        let newOrders = [...orders];
        let filtOrders = newOrders.filter((item, idx) => idx !== rowIndex);
        setOrders(filtOrders);
    };

    const submitOrders = async () => {
        let data = {
            custname,
            total,
            orders,
        };
        
        if(orderId !== undefined)
        {
            data.id = parseInt(orderId)
        }

        if (total === 0) {
            alert("No orders found");
            return 1;
        }

        if (custname === "") {
            alert("Customer name required");
            return 1;
        }

        const res = await axios.post("/api/submit-order", data);

        nav("/");
    };

    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h1 className="card-title">
                        Order Detail - {orderId == undefined ? "New" : "Edit"}
                    </h1>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-4">
                            <label>Customer Name</label>
                            <select
                                disabled={
                                    orderId === undefined ? "" : "disabled"
                                }
                                value={custname}
                                className="form-select"
                                onChange={(e) => setCustname(e.target.value)}
                            >
                                <option value="">Select Customer</option>
                                {customers.map((item, index) => (
                                    <option key={"c_" + index} value={item.id}>
                                        {item.cust_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-3">
                            <label>Product</label>
                            <select className="form-select" ref={code}>
                                <option value="">Select Product</option>
                                {products.map((item, index) => (
                                    <option key={"p_" + index} value={item.id}>
                                        {item.prod_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-sm-1">
                            <label>Qty</label>
                            <input
                                className="form-control input-sm"
                                type="number"
                                name="qty"
                                min={0}
                                ref={qty}
                            />
                        </div>
                        <div className="col-sm-2">
                            <br />
                            <button
                                type="button"
                                className="btn btn-outline-primary"
                                onClick={addOrder}
                            >
                                Add
                            </button>
                        </div>
                        <div className="col-sm-4 offset-sm-2">
                            <br />
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={submitOrders}
                            >
                                Submit Order
                            </button>
                            &nbsp;
                            <a href="/" className="btn btn-outline-secondary">Return</a>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>
                                    Gross
                                    <br />
                                    Sales
                                </th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.prod_name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.qty}</td>
                                    <td>{parseFloat(item.gross).toFixed(2)}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() => removeOrder(index)}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan="3">Total Amount</td>
                                <td>{parseFloat(total).toFixed(2)}</td>
                                <td>&nbsp;</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default OrderDetail;
