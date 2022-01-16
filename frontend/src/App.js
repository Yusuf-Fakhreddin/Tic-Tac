import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QueryCache, QueryClient, QueryClientProvider } from "react-query";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import languages from "./languages";

import ScrollTop from "./components/Layout/BackToTop";
import { Fab } from "@mui/material";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import RTL from "./components/Layout/RTL";
// Screens
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import ProductScreen from "./screens/ProductScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
// User Screens
import ProfileScreen from "./screens/User/ProfileScreen";
import ShippingScreen from "./screens/User/ShippingScreen";
import PaymentMethodScreen from "./screens/User/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/User/PlaceOrderScreen";
import OrderDetailsScreen from "./screens/User/OrderDetailsScreen";
import MyOrdersTable from "./screens/User/MyOrdersTableScreen";
// Admin Screens
import UsersListScreen from "./screens/Admin/UsersListScreen";
import AdminEditUserScreen from "./screens/Admin/AdminEditUserScreen";
import ProductListScreen from "./screens/Admin/ProductListScreen";
import ProductCreateScreen from "./screens/Admin/ProductCreateScreen";
import OrdersListScreen from "./screens/Admin/OrdersListScreen";
import AdminEditProduct from "./screens/Admin/AdminEditProduct";
import TodayStatistics from "./screens/Admin/TodayStatistics";
import WeekStatistics from "./screens/Admin/WeekStatistics";
import MonthStatistics from "./screens/Admin/MonthStatistics";
import YearStatistics from "./screens/Admin/YearStatistics";
import Dashboard from "./screens/Admin/Dashboard";
import MyBottomNavigation from "./components/Layout/MyBottomNavigation";
import SearchResults from "./screens/SearchResults";

const stripePromise = loadStripe(
	"pk_test_51JlXInJ0ElzwxyfLM4xSifxQhuyJcLrLUeGXHp4rx73qQfHEQ5u0R5wcBubuozzYhXpZsXvAIeYzzFV9CGsMVG3a001nfCoVgh"
);

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
				main: "#3C85FC",
				dark: "#223862",
				// contrastText: "#fff",
			},
			text: {
				primary: "#223862",
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
							<MyBottomNavigation />

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
												component={SearchResults}
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
