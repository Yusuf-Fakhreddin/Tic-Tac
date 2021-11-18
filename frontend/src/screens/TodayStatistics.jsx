import { CircularProgress, Grid } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import DashboardIntervalButtons from "../components/DashboardIntervalButtons";
import DashboardNavigationBox from "../components/DashboardNavigationBox";
import IntervalStatisticsBoxes from "../components/IntervalStatisticsBoxes";
import { useTodayStatistics } from "../Queries/DashboardQueries";

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
				<DashboardNavigationBox />
			</Grid>
			<Grid item md={8}>
				<DashboardIntervalButtons />
				{todayData ? (
					<IntervalStatisticsBoxes data={todayData} />
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

export default TodayStatistics;
