import { Divider, ListItem, ListItemText, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const PricesSummary = ({ totalPrice, itemsPrice, shippingPrice }) => {
	const { t } = useTranslation();

	return (
		<>
			<ListItem>
				<ListItemText>
					<Typography variant="h6" component="h3">
						{t("orderSummary")}
					</Typography>
				</ListItemText>
			</ListItem>
			<Divider />
			<ListItem>
				<ListItemText>
					{t("itemsCost")}:
					<Typography variant="h6" component="h3" sx={{ display: "inline" }}>
						{" " + itemsPrice} {t("egp")}
					</Typography>
				</ListItemText>
			</ListItem>
			<Divider />
			<ListItem>
				<ListItemText>
					{t("shippingCost")}:
					<Typography variant="h6" component="h3" sx={{ display: "inline" }}>
						{" " + shippingPrice} {t("egp")}
					</Typography>
				</ListItemText>
			</ListItem>
			<Divider />
			<ListItem>
				<ListItemText>
					{t("totalCost")}:
					<Typography variant="h6" component="h3" sx={{ display: "inline" }}>
						{" " + totalPrice} {t("egp")}
					</Typography>
				</ListItemText>
			</ListItem>
		</>
	);
};

export default PricesSummary;
