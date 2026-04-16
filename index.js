import projects from "./projects.json";
import services from "./services.json";
import skills from "./skills.json";

function withCors(response) {
  const headers = new Headers(response.headers);
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function json(data, init = {}) {
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");

  return withCors(
    new Response(JSON.stringify(data), {
      ...init,
      headers,
    }),
  );
}

export default {
  async fetch(request) {
    const { method } = request;
    const url = new URL(request.url);
    const pathname = url.pathname.replace(/\/+$/, "") || "/";

    if (method === "OPTIONS") {
      return withCors(new Response(null, { status: 204 }));
    }

    if (method === "GET" && pathname === "/") {
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

    if (method === "GET" && (pathname === "/api/projects" || pathname === "/api/project")) {
      return json(projects);
    }

    if (method === "GET" && pathname.startsWith("/api/project/")) {
      const id = Number(pathname.split("/").pop());

      if (!Number.isInteger(id)) {
        return json({ error: "Invalid project id" }, { status: 400 });
      }

      const project = projects.find((p) => p.id === id);

      if (!project) {
        return json({ error: "Project not found" }, { status: 404 });
      }

      return json(project);
    }

    if (method === "GET" && (pathname === "/api/services" || pathname === "/api/service")) {
      return json(services);
    }

    if (method === "GET" && pathname.startsWith("/api/service/")) {
      const id = Number(pathname.split("/").pop());

      if (!Number.isInteger(id)) {
        return json({ error: "Invalid service id" }, { status: 400 });
      }

      const service = services.find((item) => item.id === id);

      if (!service) {
        return json({ error: "Service not found" }, { status: 404 });
      }

      return json(service);
    }

    if (method === "GET" && (pathname === "/api/skills" || pathname === "/api/skill")) {
      return json(skills);
    }

    if (method === "GET" && pathname.startsWith("/api/skill/")) {
      const id = Number(pathname.split("/").pop());

      if (!Number.isInteger(id)) {
        return json({ error: "Invalid skill id" }, { status: 400 });
      }

      const skill = skills.find((item) => item.id === id);

      if (!skill) {
        return json({ error: "Skill not found" }, { status: 404 });
      }

      return json(skill);
    }

    return json({ error: "Not Found" }, { status: 404 });
  },
};
