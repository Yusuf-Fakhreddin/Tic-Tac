import { Box } from "@mui/system";
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
		<Box display={{ xs: "none", lg: "block" }}>
			<Lottie
				options={defaultOptions}
				height={72}
				width={720}
				isStopped={isStopped}
				isPaused={isPaused}
			/>
		</Box>
	);
};

export default OrdersAnimation;
