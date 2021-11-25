import { CircularProgress, Grid } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import DashboardIntervalButtons from "../components/DashboardIntervalButtons";
import AdminNavigationBox from "../components/AdminNavigationBox";
import IntervalStatisticsBoxes from "../components/IntervalStatisticsBoxes";
import { useWeekStatistics } from "../Queries/DashboardQueries";

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

export default WeekStatistics;
