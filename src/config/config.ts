export default () => ({
  port: parseInt(process.env.PORT, 10) || 3030,
  jwtSecret: process.env.JWT_SECRET,
  mongoose: {
    uri: process.env.MONGOOSE_URI,
  },
});
