import { Grid } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useTodayStatistics } from "../../Queries/DashboardQueries";
import DashboardIntervalButtons from "../../components/Admin/DashboardIntervalButtons";
import AdminNavigationBox from "../../components/Admin/AdminNavigationBox";
import IntervalStatisticsBoxes from "../../components/Admin/IntervalStatisticsBoxes";
import CenteredCircularProgress from "../../components/CenteredCircularProgress";

const TodayStatistics = () => {
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const history = useHistory();
	useEffect(() => {
		if (!userInfo || !userInfo.isAdmin) {
			history.push("/");
		}
	}, [history, userInfo]);

	const [todayData, todayLoading, refetchToday] = useTodayStatistics(
		userInfo.token
	);

	return (
		<Grid container spacing={2}>
			<Grid item md={2}>
				<AdminNavigationBox />
			</Grid>
			<Grid item md={8}>
				<DashboardIntervalButtons />
				{todayData ? (
					<IntervalStatisticsBoxes data={todayData} />
				) : (
					<CenteredCircularProgress />
				)}
			</Grid>
		</Grid>
	);
};

export default TodayStatistics;
