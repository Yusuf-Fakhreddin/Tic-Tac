import React, { useState } from "react";
import Lottie from "react-lottie";
import animationData from "../../Animations JSON/cartLight70.json";

const LoginCartAnimation = () => {
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
		<Lottie
			options={defaultOptions}
			// height={70}
			// width={70}
			isStopped={isStopped}
			isPaused={isPaused}
		/>
	);
};

export default LoginCartAnimation;
