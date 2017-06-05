const analyticsMiddleware = store => next => action => {
  console.log("In Analytics Middleware:", action);
  next(action);
};

export default analyticsMiddleware;