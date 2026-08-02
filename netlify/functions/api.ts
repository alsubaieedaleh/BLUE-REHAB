import {
  apiErrorResult,
  createBookingDraft,
  getCatalog,
  getCourseDetail,
  getHealth,
  type ApiResult,
} from "../../server/src/api.js";

const FUNCTION_PREFIX = "/.netlify/functions/api";
const API_PREFIX = "/api";

function routePath(request: Request) {
  const pathname = new URL(request.url).pathname;
  const withoutFunctionPrefix = pathname.startsWith(FUNCTION_PREFIX)
    ? pathname.slice(FUNCTION_PREFIX.length)
    : pathname;
  const withoutApiPrefix = withoutFunctionPrefix.startsWith(API_PREFIX)
    ? withoutFunctionPrefix.slice(API_PREFIX.length)
    : withoutFunctionPrefix;
  const normalized = withoutApiPrefix || "/";
  return normalized.length > 1 ? normalized.replace(/\/$/, "") : normalized;
}

function corsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get("origin");
  const allowedOrigins = (process.env.CLIENT_URL ?? "")
    .split(",")
    .map((value) => value.trim().replace(/\/$/, ""))
    .filter(Boolean);

  const headers: Record<string, string> = {
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    Vary: "Origin",
  };

  if (origin && allowedOrigins.includes(origin.replace(/\/$/, ""))) {
    headers["Access-Control-Allow-Origin"] = origin;
  }

  return headers;
}

function jsonResponse(request: Request, result: ApiResult) {
  return new Response(JSON.stringify(result.body), {
    status: result.status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": result.cacheControl ?? "no-store",
      ...corsHeaders(request),
    },
  });
}

async function parseJson(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    throw new TypeError("JSON content type required");
  }
  return request.json();
}

export default async function handler(request: Request) {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders(request) });
  }

  const path = routePath(request);

  try {
    if (request.method === "GET" && path === "/health") {
      return jsonResponse(request, getHealth());
    }

    if (request.method === "GET" && path === "/catalog") {
      return jsonResponse(request, await getCatalog());
    }

    const courseMatch = path.match(/^\/courses\/([^/]+)$/);
    if (request.method === "GET" && courseMatch) {
      return jsonResponse(request, await getCourseDetail(decodeURIComponent(courseMatch[1])));
    }

    if (request.method === "POST" && path === "/bookings/drafts") {
      let payload: unknown;
      try {
        payload = await parseJson(request);
      } catch {
        return jsonResponse(request, {
          status: 400,
          body: { error: "Invalid JSON request" },
          cacheControl: "no-store",
        });
      }

      return jsonResponse(
        request,
        await createBookingDraft(request.headers.get("authorization"), payload),
      );
    }

    return jsonResponse(request, {
      status: 404,
      body: { error: "Route not found" },
      cacheControl: "no-store",
    });
  } catch (error) {
    return jsonResponse(request, apiErrorResult(error));
  }
}
