import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { NavLink } from "react-router-dom";
import React from "react";
const steps = [
	{ label: "Shipping", link: "/shipping" },
	{ label: "Payment Method", link: "/paymentmethod" },
	{ label: "Place Order", link: "/placeorder" },
];
const CheckoutSteps = ({ Shipping, Payment, Order }) => {
	let activeStep = 0;
	if (Payment) activeStep = 1;
	else if (Order) activeStep = 2;
	return (
		<Box sx={{ width: "100%" }}>
			<Stepper activeStep={activeStep} alternativeLabel>
				{React.Children.toArray(
					steps.map((step) => (
						<Step>
							<NavLink to={step.link}>
								<StepLabel>{step.label}</StepLabel>
							</NavLink>
						</Step>
					))
				)}
			</Stepper>
		</Box>
	);
};

export default CheckoutSteps;
