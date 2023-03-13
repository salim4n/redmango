import React, { useState } from "react";
import { useLoginUserMutation, useRegisterUserMutation } from "../api/authApi";
import { inputHelper } from "../Components/Helper";
import { apiResponse, userModel } from "../interfaces";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setLoginUser } from "../Storage/Redux/userAuthSlice";
import { useNavigate } from "react-router-dom";
import { MainLiader } from "./Common";

function Login() {
	const [error, setError] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loginUser] = useLoginUserMutation();
	const [loading, setLoading] = useState(false);
	const [userInput, setUserInput] = useState({
		userName: "",
		password: "",
	});

	const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const tempData = inputHelper(e, userInput);
		setUserInput(tempData);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		const response: apiResponse = await loginUser({
			userName: userInput.userName,
			password: userInput.password,
		});
		if (response.data) {
			console.log(response.data.result.token);
			const { token } = response.data.result;
			const { fullName, id, email, role }: userModel = jwt_decode(token);
			localStorage.setItem("token", token);
			dispatch(setLoginUser({ fullName, id, email, role }));
			navigate("/");
		} else if (response.error) {
			console.error(response.error.data.errorMessages[0]);
			setError(response.error.data.errorMessages[0]);
		}
		setLoading(false);
	};

	return (
		<div className="container text-center">
			{loading && <MainLiader />}
			{error && <p className="text-danger">{error}</p>}
			<form method="post" onSubmit={handleSubmit}>
				<h1 className="mt-5">Login</h1>
				<div className="mt-5">
					<div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
						<input
							type="text"
							className="form-control"
							placeholder="Enter Username"
							name="userName"
							value={userInput.userName}
							onChange={handleUserInput}
							required
						/>
					</div>

					<div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
						<input
							type="password"
							className="form-control"
							placeholder="Enter Password"
							name="password"
							value={userInput.password}
							onChange={handleUserInput}
							required
						/>
					</div>
				</div>

				<div className="mt-2">
					<button
						type="submit"
						className="btn btn-success"
						style={{ width: "200px" }}>
						Login
					</button>
				</div>
			</form>
		</div>
	);
}

export default Login;
