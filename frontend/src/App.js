import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Footer from "./components/Footer";
import Header from "./components/Header";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import ScrollTop from "./components/BackToTop";
import { Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderDetailsScreen from "./screens/OrderDetailsScreen";
import MyOrdersTable from "./screens/MyOrdersTableScreen";
import UsersListScreen from "./screens/UsersListScreen";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			staleTime: 30000,
			keepPreviousData: true,
		},
	},
});

function App() {
	// const theme = createTheme({});
	return (
		// <ThemeProvider theme={theme}>
		<QueryClientProvider client={queryClient}>
			<Router>
				<div>
					<Header />
					<main>
						<Container>
							<Switch>
								<Route path="/product/:id" component={ProductScreen} />
								<Route path="/cart" component={CartScreen} />
								<Route path="/login" component={LoginScreen} />
								<Route path="/register" component={RegisterScreen} />
								<Route path="/profile" component={ProfileScreen} />
								<Route path="/shipping" component={ShippingScreen} />
								<Route path="/paymentmethod" component={PaymentMethodScreen} />
								<Route path="/placeorder" component={PlaceOrderScreen} />
								<Route path="/order/:id" component={OrderDetailsScreen} />
								<Route path="/myorders" component={MyOrdersTable} />
								<Route path="/admin/users" component={UsersListScreen} />

								<Route path="/" component={HomeScreen} />
							</Switch>
						</Container>
						<ScrollTop>
							<Fab
								color="secondary"
								size="small"
								aria-label="scroll back to top"
							>
								<KeyboardArrowUpIcon />
							</Fab>
						</ScrollTop>
					</main>
					<Footer />
				</div>
			</Router>
		</QueryClientProvider>
		// </ThemeProvider>
	);
}

export default App;
