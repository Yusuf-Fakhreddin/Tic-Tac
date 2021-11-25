import { useQuery } from "react-query";
import http from "../httpService";

// <----------- Queries ---------->
const getTodayStatistics = async (token) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	const { data } = await http.get(`/api/interval_statistics/today`, config);
	return data;
};

export const useTodayStatistics = (token) => {
	const { data, error, isLoading, refetch, isError } = useQuery(
		["TodayStatistics"],
		() => getTodayStatistics(token)
	);
	return [data, isLoading, refetch];
};

const getWeekStatistics = async (token) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	const { data } = await http.get(`/api/interval_statistics/week`, config);
	return data;
};

export const useWeekStatistics = (token) => {
	const { data, error, isLoading, refetch, isError } = useQuery(
		["WeekStatistics"],
		() => getWeekStatistics(token)
	);
	return [data, isLoading, refetch];
};

const getMonthStatistics = async (token) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	const { data } = await http.get(`/api/interval_statistics/month`, config);
	return data;
};

export const useMonthStatistics = (token) => {
	const { data, error, isLoading, refetch, isError } = useQuery(
		["MonthStatistics"],
		() => getMonthStatistics(token)
	);
	return [data, isLoading, refetch];
};

const getYearStatistics = async (token) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	const { data } = await http.get(`/api/interval_statistics/year`, config);
	return data;
};

export const useYearStatistics = (token) => {
	const { data, error, isLoading, refetch, isError } = useQuery(
		["YearStatistics"],
		() => getYearStatistics(token)
	);
	return [data, isLoading, refetch];
};

const getDashboardStatistics = async (token) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	const { data } = await http.get(`/api/dashboard`, config);
	return data;
};

export const useDashboardStatistics = (token) => {
	const { data, error, isLoading, isError } = useQuery(
		["dashboardStatistics"],
		() => getDashboardStatistics(token)
	);
	return [data, isLoading];
};
