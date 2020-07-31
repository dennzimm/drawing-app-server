export default () => ({
  port: parseInt(process.env.PORT, 10) || 3030,
  jwtSecret: process.env.JWT_SECRET,
  mongoose: {
    uri: process.env.MONGOOSE_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '24h' },
  },
});
