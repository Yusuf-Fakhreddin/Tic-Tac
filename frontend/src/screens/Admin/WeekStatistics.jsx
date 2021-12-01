import { Grid } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useWeekStatistics } from "../../Queries/DashboardQueries";
import CenteredCircularProgress from "../../components/CenteredCircularProgress";
import AdminNavigationBox from "../../components/Admin/AdminNavigationBox";
import IntervalStatisticsBoxes from "../../components/Admin/IntervalStatisticsBoxes";
import DashboardIntervalButtons from "../../components/Admin/DashboardIntervalButtons";

const WeekStatistics = () => {
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const history = useHistory();
	useEffect(() => {
		if (!userInfo || !userInfo.isAdmin) {
			history.push("/");
		}
	}, [history, userInfo]);

	const [weekData, weekLoading, refetchWeek] = useWeekStatistics(
		userInfo.token
	);

	return (
		<Grid container spacing={2}>
			<Grid item md={2}>
				<AdminNavigationBox />
			</Grid>
			<Grid item md={8}>
				<DashboardIntervalButtons />
				{weekData ? (
					<IntervalStatisticsBoxes data={weekData} />
				) : (
					<CenteredCircularProgress />
				)}
			</Grid>
		</Grid>
	);
};

export default WeekStatistics;
