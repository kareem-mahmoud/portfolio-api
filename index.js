import { json, withCors } from "./lib/response.js";
import { handleHomeRoute } from "./routes/home.js";
import { handleProjectRoutes } from "./routes/projects.js";
import { handleServiceRoutes } from "./routes/services.js";
import { handleSkillRoutes } from "./routes/skills.js";

const routes = [
  handleHomeRoute,
  handleProjectRoutes,
  handleServiceRoutes,
  handleSkillRoutes,
];

export default {
  async fetch(request) {
    const { method } = request;
    const url = new URL(request.url);
    const pathname = url.pathname.replace(/\/+$/, "") || "/";

    if (method === "OPTIONS") {
      return withCors(new Response(null, { status: 204 }));
    }

    for (const route of routes) {
      const response = route(method, pathname);

      if (response) {
        return response;
      }
    }

    return json({ error: "Not Found" }, { status: 404 });
  },
};
