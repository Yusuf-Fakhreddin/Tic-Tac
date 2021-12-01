import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const RTL = (props) => {
	const cacheRtl = createCache({
		key: "muirtl",
		stylisPlugins: [rtlPlugin],
	});
	if (props.rtl)
		return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
	else return <div>{props.children}</div>;
};
export default RTL;
