import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import ScrollTop from "./components/BackToTop";
import { Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function App() {
	// const theme = createTheme({});
	return (
		// <ThemeProvider theme={theme}>
		<Router>
			<div>
				<Header />
				<main>
					<Container>
						<Switch>
							<Route path="/product/:id" component={ProductScreen} />
							<Route path="/" component={HomeScreen} />
						</Switch>
					</Container>
					<ScrollTop>
						<Fab color="secondary" size="small" aria-label="scroll back to top">
							<KeyboardArrowUpIcon />
						</Fab>
					</ScrollTop>
				</main>
				<Footer />
			</div>
		</Router>

		// </ThemeProvider>
	);
}

export default App;
