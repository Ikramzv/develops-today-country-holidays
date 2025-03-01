export default () => ({
  dateNagerApi: process.env.DATE_NAGER_API,
  countriesNowApi: process.env.COUNTRIES_NOW_API,
  swagger: {
    enabled: process.env.SWAGGER_ENABLED === 'true',
    title: process.env.SWAGGER_TITLE || 'Country Holidays API',
    version: process.env.SWAGGER_VERSION || '1.0',
    description:
      process.env.SWAGGER_DESCRIPTION ||
      'API for getting country information and adding holidays to calendar',
  },
});
