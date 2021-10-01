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

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			staleTime: 30000,
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
