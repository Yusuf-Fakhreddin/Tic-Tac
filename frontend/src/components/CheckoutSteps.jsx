import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { NavLink } from "react-router-dom";

const steps = ["Shipping", "Payment", "Order"];
const CheckoutSteps = ({ Shipping, Payment, Order }) => {
	let activeStep = 0;
	if (Payment) activeStep = 1;
	else if (Order) activeStep = 2;
	return (
		<Box sx={{ width: "100%" }}>
			<Stepper activeStep={activeStep} alternativeLabel>
				{steps.map((label) => (
					<Step key={label}>
						<NavLink to={"/" + label}>
							<StepLabel>{label}</StepLabel>
						</NavLink>
					</Step>
				))}
			</Stepper>
		</Box>
	);
};

export default CheckoutSteps;
