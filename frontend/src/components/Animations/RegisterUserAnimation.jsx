import React, { useState } from "react";
import Lottie from "react-lottie";
import animationData from "../../Animations JSON/loginLight.json";
import { Box } from "@mui/system";

const RegisterUserAnimation = () => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		renderer: "svg",
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	const [isStopped, setIsStopped] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	return (
		<Box
			sx={{
				height: "100%",
				display: "grid",
				placeItems: "center",
			}}
			display={{ xs: "none", lg: "block" }}
			// marginY={5}
		>
			<Lottie
				options={defaultOptions}
				height={350}
				width={350}
				isStopped={isStopped}
				isPaused={isPaused}
			/>
		</Box>
	);
};

export default RegisterUserAnimation;
