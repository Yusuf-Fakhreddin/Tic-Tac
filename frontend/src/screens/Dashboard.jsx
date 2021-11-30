import { CircularProgress, Grid } from "@mui/material";
import AdminNavigationBox from "../components/AdminNavigationBox";
import { useDashboardStatistics } from "../Queries/DashboardQueries";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";

import YearCountChart from "../components/Charts/YearCountChart";
import { Box } from "@mui/system";
import DashboardCountBox from "../components/DashboardCountBox";
import CenteredCircularProgress from "../components/CenteredCircularProgress";
import OrdersPieChart from "../components/Charts/OrdersPieChart";
import CategoriesPieChart from "../components/Charts/CategoriesPieChart";

const Dashboard = () => {
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const history = useHistory();

	useEffect(() => {
		if (!userInfo || !userInfo.isAdmin) {
			history.push("/");
		}
	}, [history, userInfo]);
	const [data, loading] = useDashboardStatistics(userInfo.token);
	return (
		<Grid container spacing={2}>
			<Grid item md={2}>
				<AdminNavigationBox />
			</Grid>
			<Grid item md={10}>
				{!data ? (
					<CenteredCircularProgress />
				) : (
					<Box>
						<Grid container spacing={2} my={2} rowSpacing={2}>
							<Grid item md={4}>
								<DashboardCountBox
									label="Total Number of Users:"
									count={data.totalUsersCount}
								/>
							</Grid>
							<Grid item md={4}>
								<DashboardCountBox
									label="Total Number of Orders:"
									count={data.totalOrdersCount}
								/>
							</Grid>
							<Grid item md={4}>
								<DashboardCountBox
									label="Total Number of Products:"
									count={data.totalProductsCount}
								/>
							</Grid>
							<Grid item md={4}>
								<DashboardCountBox
									label="Total Orders Price:"
									count={
										data.ordersPie.reduce((a, b) => +a + +b.totalPriceSum, 0) +
										" EGP"
									}
								/>
							</Grid>
						</Grid>
						<Grid container spacing={2} my={2} rowSpacing={2}>
							<Grid item xs={10} md={6}>
								<OrdersPieChart orders={data.ordersPie} />
							</Grid>
							<Grid item xs={10} md={6}>
								<CategoriesPieChart products={data.productsPie} />
							</Grid>
						</Grid>
						<YearCountChart
							users={data.users}
							products={data.products}
							orders={data.orders}
						/>
					</Box>
				)}
			</Grid>
		</Grid>
	);
};

export default Dashboard;
