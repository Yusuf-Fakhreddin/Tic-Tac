import { FormControl, InputLabel, Select } from "@mui/material";
import { useState } from "react";
import { Controller } from "react-hook-form";

const ReactHookFormSelect = ({
	name,
	label,
	control,
	defaultValue,
	children,
	...props
}) => {
	const labelId = `${name}-label`;
	return (
		<FormControl fullWidth {...props}>
			<InputLabel id={labelId}>{label}</InputLabel>
			<Controller
				as={<Select>{children}</Select>}
				name={name}
				control={control}
			/>
		</FormControl>
	);
};
export default ReactHookFormSelect;
