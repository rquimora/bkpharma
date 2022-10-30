import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import OrderDetail from "./OrderDetail";
import Orders from "./Orders";

function App() {
    return (
        <>
            <Router>
                <Nav />
                <Routes>
                    <Route path="/" element={<Orders />} />
                    <Route path="/order-detail/:orderId" element={<OrderDetail />} />
                    <Route path="/order-detail" element={<OrderDetail />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
