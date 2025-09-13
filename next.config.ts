import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	reactStrictMode: false,
	experimental: {
		clientSegmentCache: true,
	},
};

export default nextConfig;
