const withAuth = (WrappedComponent: any) => {
	console.log("HOC Call");
	return (props: any) => {
		const accessToken = localStorage.getItem("token");
		if (!accessToken) {
			window.location.replace("/login");
			return null;
		}
		return <WrappedComponent {...props} />;
	};
};

export default withAuth;
