import { CircularProgress, Grid } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useMonthStatistics } from "../../Queries/DashboardQueries";

import DashboardIntervalButtons from "../../components/Admin/DashboardIntervalButtons";
import AdminNavigationBox from "../../components/Admin/AdminNavigationBox";
import IntervalStatisticsBoxes from "../../components/Admin/IntervalStatisticsBoxes";

const MonthStatistics = () => {
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const history = useHistory();
	useEffect(() => {
		if (!userInfo || !userInfo.isAdmin) {
			history.push("/");
		}
	}, [history, userInfo]);

	const [monthData, monthLoading, refetchMonth] = useMonthStatistics(
		userInfo.token
	);
	return (
		<Grid container spacing={2}>
			<Grid item md={2}>
				<AdminNavigationBox />
			</Grid>
			<Grid item md={8}>
				<DashboardIntervalButtons />
				{monthData ? (
					<IntervalStatisticsBoxes data={monthData} />
				) : (
					<div className="flex">
						<CircularProgress
							size="3.2em"
							sx={{
								margin: "15px auto",
							}}
						/>
					</div>
				)}
			</Grid>
		</Grid>
	);
};

export default MonthStatistics;
