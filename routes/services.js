import services from "../services.json";
import { json } from "../lib/response.js";

export function handleServiceRoutes(method, pathname) {
  if (method !== "GET") {
    return null;
  }

  if (pathname === "/api/services" || pathname === "/api/service") {
    return json(services);
  }

  if (!pathname.startsWith("/api/service/")) {
    return null;
  }

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
