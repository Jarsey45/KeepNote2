import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	webpack: (config, { isServer }) => {
		if( isServer ) {
			// Disable minification for server build to avoid issues with TypeORM
			config.optimization.minimize = false;
		}
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
			// Suppress TypeORM's optional driver warnings (replaces webpack-filter-warnings-plugin)
			{ message: /mongodb|mssql|mysql|mysql2|oracledb|pg-native|pg-query-stream|react-native-sqlite-storage|sqlite3|sql\.js|typeorm-aurora-data-api-driver|hdb-pool|spanner|hana-client/ },
		];

		return config;
	},
	sassOptions: {
		includePaths: ['@/app/src/app/styles'],
	},
	turbopack: {},
	serverExternalPackages: ['typeorm'],
	reactCompiler: true
};

export default nextConfig;
