import { CircularProgress } from "@mui/material";

const CenteredCircularProgress = () => {
	return (
		<div className="flex">
			<CircularProgress
				size="3.2em"
				sx={{
					margin: "15px auto",
				}}
			/>
		</div>
	);
};

export default CenteredCircularProgress;
