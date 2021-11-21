import { CircularProgress, Grid } from "@mui/material";
import DashboardNavigationBox from "../components/DashboardNavigationBox";
import { useGraphStatistics } from "../Queries/DashboardQueries";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useEffect } from "react";

import YearCountChart from "../components/Charts/YearCountChart";

const DashboardCharts = () => {
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const history = useHistory();
	useEffect(() => {
		if (!userInfo || !userInfo.isAdmin) {
			history.push("/");
		}
	}, [history, userInfo]);

	const [data, loading] = useGraphStatistics(userInfo.token);
	return (
		<Grid container spacing={2}>
			<Grid item md={2}>
				<DashboardNavigationBox />
			</Grid>
			<Grid item md={10}>
				{!data ? (
					<CircularProgress />
				) : (
					<YearCountChart
						users={data.users}
						products={data.products}
						orders={data.orders}
					/>
				)}
			</Grid>
		</Grid>
	);
};

export default DashboardCharts;
