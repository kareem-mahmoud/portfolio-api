import projects from "./projects.json";

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

    if (method === "OPTIONS") {
      return withCors(new Response(null, { status: 204 }));
    }

    if (method === "GET" && url.pathname === "/") {
      return json({ message: "Projects API is running" });
    }

    if (method === "GET" && url.pathname === "/api/projects") {
      return json(projects);
    }

    if (method === "GET" && url.pathname.startsWith("/api/project/")) {
      const id = Number(url.pathname.split("/").pop());

      if (!Number.isInteger(id)) {
        return json({ error: "Invalid project id" }, { status: 400 });
      }

      const project = projects.find((p) => p.id === id);

      if (!project) {
        return json({ error: "Project not found" }, { status: 404 });
      }

      return json(project);
    }

    return json({ error: "Not Found" }, { status: 404 });
  },
};
