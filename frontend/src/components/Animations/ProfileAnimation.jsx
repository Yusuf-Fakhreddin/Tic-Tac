import { Box } from "@mui/system";
import React, { useState } from "react";
import Lottie from "react-lottie";
import animationData from "../../Animations JSON/ProfileCircleLight.json";

const ProfileAnimation = () => {
	const defaultOptions = {
		loop: false,
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
		<Box display={{ xs: "none", lg: "block" }}>
			<Lottie
				options={defaultOptions}
				height={250}
				width={250}
				isStopped={isStopped}
				isPaused={isPaused}
			/>{" "}
		</Box>
	);
};

export default ProfileAnimation;
