import React, { useState } from "react";
import Lottie from "react-lottie";
import animationData from "../../Animations JSON/order.json";

const OrdersAnimation = () => {
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
			height={72}
			width={720}
			isStopped={isStopped}
			isPaused={isPaused}
		/>
	);
};

export default OrdersAnimation;
