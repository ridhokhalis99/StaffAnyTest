import * as HapiSwagger from "hapi-swagger";
import Package from "../../package.json";

const swaggerOptions: HapiSwagger.RegisterOptions = {
  info: {
    title: "Api Documentation",
    version: Package.version
  },
  grouping: 'tags',
  securityDefinitions: {
    'jwt': {
      'type': 'apiKey',
      'name': 'Authorization',
      'in': 'header'
      // 'x-keyPrefix': 'Bearer '
    }
  },
  security: [{ jwt: [] }],
};

export default swaggerOptions;