export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  USER_DASHBOARD: "/dashboard",
  BREEDER_DASHBOARD: "/bcs",
  SPECIALIST_DASHBOARD: "/specialist",
  PROFILE: "/profile",
};

// Маршруты по умолчанию для каждой роли
export const DEFAULT_ROUTES_BY_ROLE = {
  user: ROUTES.USER_DASHBOARD,
  breeder: ROUTES.BREEDER_DASHBOARD,
  specialist: ROUTES.SPECIALIST_DASHBOARD,
};
