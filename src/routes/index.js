const routes = [require('./user').default];

const setupRoutes = (app, prefix) => {
  routes.forEach((route) => app.use(prefix, route));
};

export default setupRoutes;
