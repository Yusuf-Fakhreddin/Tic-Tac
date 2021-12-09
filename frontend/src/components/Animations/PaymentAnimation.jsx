import React, { useState } from "react";
import Lottie from "react-lottie";
import animationData from "../../Animations JSON/37960-online-payment.json";

const PaymentAnimation = () => {
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
			// height={328}
			// width={1000}
			isStopped={isStopped}
			isPaused={isPaused}
		/>
	);
};
export default PaymentAnimation;
