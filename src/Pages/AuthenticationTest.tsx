import React from "react";
import { withAuth } from "../HOC";

function AuthenticationTest() {
	return <div>This page can only be access by any any logged user</div>;
}

export default withAuth(AuthenticationTest);
