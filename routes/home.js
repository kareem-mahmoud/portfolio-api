import { json } from "../lib/response.js";

export function handleHomeRoute(method, pathname) {
  if (method !== "GET" || pathname !== "/") {
    return null;
  }

  return json({
    message: "Portfolio API is running",
    endpoints: [
      "/api",
      "/api/projects",
      "/api/project/:id",
      "/api/services",
      "/api/service/:id",
      "/api/skills",
      "/api/skill/:id",
    ],
  });
}
