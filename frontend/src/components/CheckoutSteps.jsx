import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { NavLink } from "react-router-dom";
import React from "react";
import { useTranslation } from "react-i18next";

const CheckoutSteps = ({ Shipping, Payment, Order }) => {
	const { t } = useTranslation();

	const steps = [
		{ label: t("shipping"), link: "/shipping" },
		{ label: t("paymentMethod"), link: "/paymentmethod" },
		{ label: t("placeOrder"), link: "/placeorder" },
	];

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
