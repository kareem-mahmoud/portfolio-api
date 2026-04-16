import projects from "../projects.json";
import { json } from "../lib/response.js";

export function handleProjectRoutes(method, pathname) {
  if (method !== "GET") {
    return null;
  }

  if (pathname === "/api/projects" || pathname === "/api/project") {
    return json(projects);
  }

  if (!pathname.startsWith("/api/project/")) {
    return null;
  }

  const id = Number(pathname.split("/").pop());

  if (!Number.isInteger(id)) {
    return json({ error: "Invalid project id" }, { status: 400 });
  }

  const project = projects.find((item) => item.id === id);

  if (!project) {
    return json({ error: "Project not found" }, { status: 404 });
  }

  return json(project);
}
