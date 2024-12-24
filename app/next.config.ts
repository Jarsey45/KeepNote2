import type { NextConfig } from 'next';
import FilterWarningsPlugin from 'webpack-filter-warnings-plugin';

const nextConfig: NextConfig = {
	webpack: (config, { isServer }) => {
		if (!isServer) {
		} // disabled for development
		config.watchOptions = {
			poll: 800, // Check for changes every second
			aggregateTimeout: 300, // Delay before rebuilding
		};

		config.ignoreWarnings = [
			{ module: /node_modules\/typeorm\/util\/ImportUtils\.js/ },
			{
				module: /node_modules\/typeorm\/util\/DirectoryExportedClassesLoader\.js/,
			},
			{ module: /node_modules\/typeorm\/platform\/PlatformTools\.js/ },
			{
				module: /node_modules\/typeorm\/connection\/ConnectionOptionsReader\.js/,
			},
			{ module: /node_modules\/typeorm\/browser\/driver\/react-native\/ReactNativeDriver\.js/ },
			{ module: /node_modules\/app-root-path\/lib\/app-root-path\.js/ },
		];

		config.plugins.push(
			new FilterWarningsPlugin({
				exclude: [
					/mongodb/,
					/mssql/,
					/mysql/,
					/mysql2/,
					/oracledb/,
					/pg/,
					/pg-native/,
					/pg-query-stream/,
					/react-native-sqlite-storage/,
					/redis/,
					/sqlite3/,
					/sql.js/,
					/typeorm-aurora-data-api-driver/,
					/hdb-pool/,
					/spanner/,
					/hana-client/,
				],
			})
		);
		return config;
	},
	sassOptions: {
		includePaths: ['@/app/src/app/styles'],
	},
	serverExternalPackages: ['typeorm'],
};

export default nextConfig;
