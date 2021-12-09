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
			<Lottie
				options={defaultOptions}
				height={250}
				width={250}
				isStopped={isStopped}
				isPaused={isPaused}
			/>
	);
};

export default ProfileAnimation;
