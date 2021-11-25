import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QueryCache, QueryClient, QueryClientProvider } from "react-query";

import Footer from "./components/Footer";
import Header from "./components/Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
import AdminEditUserScreen from "./screens/AdminEditUserScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductCreateScreen from "./screens/ProductCreateScreen";
import OrdersListScreen from "./screens/OrdersListScreen";
import AdminEditProduct from "./screens/AdminEditProduct";
import languages from "./languages";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import RTL from "./components/RTL";
import TodayStatistics from "./screens/TodayStatistics";
import WeekStatistics from "./screens/WeekStatistics";
import MonthStatistics from "./screens/MonthStatistics";
import YearStatistics from "./screens/YearStatistics";
import Dashboard from "./screens/Dashboard";
const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			staleTime: 30000,
		},
		// queryCache: new QueryCache({
		// 	onError: (error) => {
		// 		if (error.message === "Not authorized, token failed") {
		// 			dispatch(logout());
		// 		}
		// 	},
		// }),
	},
});

function App() {
	const currentLanguageCode = localStorage.getItem("i18nextLng") || "en";
	const currentLanguage = languages.find((l) => l.code === currentLanguageCode);

	const theme = createTheme({
		palette: {
			primary: {
				light: "#fbfffc",
				main: "#c8e6c9",
				dark: "#97b498",
				// contrastText: "#fff",
			},
		},
	});
	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<RTL rtl={currentLanguage.dir === "rtl" ? true : false}>
					<Router>
						<div>
							<Header />
							<Elements stripe={stripePromise}>
								<main>
									<Container>
										<Switch>
											<Route path="/product/:id" component={ProductScreen} />
											<Route path="/cart" component={CartScreen} />
											<Route path="/login" component={LoginScreen} />
											<Route path="/register" component={RegisterScreen} />
											<Route path="/profile" component={ProfileScreen} />
											<Route path="/shipping" component={ShippingScreen} />
											<Route
												path="/paymentmethod"
												component={PaymentMethodScreen}
											/>
											<Route path="/placeorder" component={PlaceOrderScreen} />
											<Route path="/order/:id" component={OrderDetailsScreen} />
											<Route path="/myorders" component={MyOrdersTable} />
											<Route
												path="/search/:keyword?/:pageNumber?"
												component={HomeScreen}
											/>
											<Route
												path="/createproduct"
												component={ProductCreateScreen}
											/>
											<Route path="/admin/users" component={UsersListScreen} />
											<Route
												path="/admin/products"
												component={ProductListScreen}
											/>
											<Route
												path="/admin/orders"
												component={OrdersListScreen}
											/>
											<Route
												path="/admin/edituser/:id"
												component={AdminEditUserScreen}
											/>
											<Route
												path="/admin/editproduct/:id"
												component={AdminEditProduct}
											/>

											<Route
												path="/admin/dashboard/today"
												component={TodayStatistics}
											/>
											<Route
												path="/admin/dashboard/week"
												component={WeekStatistics}
											/>
											<Route
												path="/admin/dashboard/month"
												component={MonthStatistics}
											/>
											<Route
												path="/admin/dashboard/year"
												component={YearStatistics}
											/>
											<Route path="/admin/dashboard" component={Dashboard} />

											<Route path="/" component={HomeScreen} />
										</Switch>
									</Container>
								</main>
								<ScrollTop>
									<Fab
										color="secondary"
										size="small"
										aria-label="scroll back to top"
									>
										<KeyboardArrowUpIcon />
									</Fab>
								</ScrollTop>
							</Elements>
							<Footer />
						</div>
					</Router>
				</RTL>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

export default App;
