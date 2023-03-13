import React from "react";
import { Header, Footer } from "../Components/Layout";
import {
	Home,
	Login,
	MenuItemDetails,
	NotFound,
	Register,
	ShoppingCart,
} from "../Pages";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetShoppingCartQuery } from "../api/shoppingCartApi";
import { setShoppingCart } from "../Storage/Redux/shoppingCartSlice";
import { userModel } from "../interfaces";
import { setLoginUser } from "../Storage/Redux/userAuthSlice";
import jwt_decode from "jwt-decode";

function App() {
	const dispatch = useDispatch();
	const { data, isLoading } = useGetShoppingCartQuery(
		"b7ae37bf-09b1-4b47-9ce1-c963031d2920",
	);

	useEffect(() => {
		const localToken = localStorage.getItem("token");
		if (localToken) {
			const { fullName, id, email, role }: userModel = jwt_decode(localToken);
			dispatch(setLoginUser({ fullName, id, email, role }));
		}
	});

	useEffect(() => {
		if (!isLoading) {
			console.log(data.result);

			dispatch(setShoppingCart(data.result?.cartItems));
		}
	}, [data]);
	return (
		<div>
			<Header />
			<div className="pb-5">
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/login" element={<Login />}></Route>
					<Route path="/register" element={<Register />}></Route>
					<Route path="/shoppingCart" element={<ShoppingCart />}></Route>
					<Route
						path="/menuItemDetails/:menuItemId"
						element={<MenuItemDetails />}></Route>
					<Route path="*" element={<NotFound />}></Route>
				</Routes>
			</div>
			<Footer />
		</div>
	);
}

export default App;
