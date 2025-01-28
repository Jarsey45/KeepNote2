import { createSwaggerSpec } from 'next-swagger-doc';

export const getApiDocs = () => {
	const spec = createSwaggerSpec({
		apiFolder: 'src/app/api',
		definition: {
			openapi: '3.0.0',
			info: {
				title: 'KeepNote2 API Documentation',
				version: '1.0.0',
			},
			components: {
				securitySchemes: {
					BearerAuth: {
						type: 'http',
						scheme: 'bearer',
						bearerFormat: 'JWT',
					},
				},
			},
			security: [],
		},
	});
	return spec;
};
