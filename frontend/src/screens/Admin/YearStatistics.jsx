import { Grid } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useYearStatistics } from "../../Queries/DashboardQueries";
import CenteredCircularProgress from "../../components/CenteredCircularProgress";
import DashboardIntervalButtons from "../../components/Admin/DashboardIntervalButtons";
import AdminNavigationBox from "../../components/Admin/AdminNavigationBox";
import IntervalStatisticsBoxes from "../../components/Admin/IntervalStatisticsBoxes";

const YearStatistics = () => {
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const history = useHistory();
	useEffect(() => {
		if (!userInfo || !userInfo.isAdmin) {
			history.push("/");
		}
	}, [history, userInfo]);

	const [yearData, yearLoading, refetchYear] = useYearStatistics(
		userInfo.token
	);

	return (
		<Grid container spacing={2}>
			<Grid item md={2}>
				<AdminNavigationBox />
			</Grid>
			<Grid item md={8}>
				<DashboardIntervalButtons />
				{yearData ? (
					<IntervalStatisticsBoxes data={yearData} />
				) : (
					<CenteredCircularProgress />
				)}
			</Grid>
		</Grid>
	);
};

export default YearStatistics;
