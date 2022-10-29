import React, { useState, useRef, useEffect } from "react";

function OrderDetail() {
    const products = [
        { id: 1, code: "P001", name: "Product 1", price: 10 },
        { id: 2, code: "P002", name: "Product 2", price: 20 },
        { id: 3, code: "P003", name: "Product 3", price: 30 },
        { id: 4, code: "P004", name: "Product 4", price: 40 },
        { id: 5, code: "P005", name: "Product 5", price: 50 },
    ];

    const [orders, setOrders] = useState([]);
    const [total, setTotal] = useState(0);
    const [custname, setCustname] = useState("");
    const qty = useRef();
    const code = useRef();

    useEffect(() => {
        let newTotal = orders.reduce((acc, item) => acc + item.gross, 0);
        setTotal(newTotal);
    }, [orders]);

    const addOrder = () => {
        let nCode = code.current.value;
        let nProd = products.find((item) => item.code === nCode);
        let nQty = qty.current.value;
        let nTotal = 0;

        console.log(nProd);
        if (nProd && nQty) {
            nProd.qty = nQty;
            nProd.gross = nProd.price * nProd.qty;

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

    const submitOrders = () => {
        const data = {
            custname,
            total,
            orders,
        };

        if (total === 0) {
            alert("No orders found");
            return 1;
        }

        if (custname === "") {
            alert("Customer name required");
            return 1;
        }

        console.log(data);
    };

    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h1 className="card-title">Order Detail</h1>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-4">
                            <label>Customer Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={custname}
                                onChange={(e) => setCustname(e.target.value)}
                            />
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
                                    <option key={index} value={item.code}>
                                        {item.name}
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
                        <div className="col-sm-2 offset-sm-4">
                            <br />
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={submitOrders}
                            >
                                Submit Order
                            </button>
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
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.qty}</td>
                                    <td>{item.gross}</td>
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
                                <td>{total}</td>
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
