import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import { keyword } from "chalk";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(1),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "12ch",
			"&:focus": {
				width: "20ch",
			},
		},
	},
}));

const SearchInput = () => {
	const history = useHistory();
	const { t } = useTranslation();

	const { register, handleSubmit, errors } = useForm({
		mode: "onBlur",
		defaultValues: {
			keyword: "",
		},
	});

	const onSubmit = (data) => {
		console.log(data);
		let { keyword } = data;
		if (keyword.trim()) history.push(`/search/${keyword}`);
		else history.push("/");
	};

	return (
		<Search>
			<form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
				<SearchIconWrapper>
					<SearchIcon />
				</SearchIconWrapper>
				<StyledInputBase
					placeholder={t("search")}
					inputProps={{ "aria-label": "search" }}
					name="keyword"
					id="keyword"
					inputRef={register}
				/>
			</form>
		</Search>
	);
};

export default SearchInput;
