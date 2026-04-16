import skills from "../skills.json";
import { json } from "../lib/response.js";

export function handleSkillRoutes(method, pathname) {
  if (method !== "GET") {
    return null;
  }

  if (pathname === "/api/skills" || pathname === "/api/skill") {
    return json(skills);
  }

  if (!pathname.startsWith("/api/skill/")) {
    return null;
  }

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
