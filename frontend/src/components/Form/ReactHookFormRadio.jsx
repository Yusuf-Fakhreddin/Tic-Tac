import {
	FormControl,
	FormControlLabel,
	FormHelperText,
	FormLabel,
	Radio,
	RadioGroup,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const ReactHookFormRadio = ({
	control,
	name,
	error,
	radioLabel,
	initialValue,
	options,
	Horizontal,
}) => {
	return (
		<Controller
			control={control}
			name={name}
			as={
				<FormControl
					// sx={{ m: 3 }}
					component="fieldset"
					error={error ? true : false}
					variant="standard"
				>
					{radioLabel && <FormLabel component="legend">{radioLabel}</FormLabel>}
					<RadioGroup row={Horizontal} defaultValue={initialValue}>
						{/* <FormControlLabel
							value="Credit/Debit Card"
							control={<Radio />}
							label="Credit/Debit Card"
						/>
						<FormControlLabel
							value="Cash On Delivery"
							control={<Radio />}
							label="Cash On Delivery"
						/> */}
						{React.Children.toArray(
							options.map((option) => (
								<FormControlLabel
									value={option}
									control={<Radio />}
									label={option}
								/>
							))
						)}
					</RadioGroup>
					<FormHelperText>{error ? error.message : ""}</FormHelperText>
				</FormControl>
			}
		/>
	);
};

export default ReactHookFormRadio;
