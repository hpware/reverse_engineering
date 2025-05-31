export default defineEventHandler(async (event) => {
  const door = getRouterParam(event, "slug");
  if (!door) {
    return "failed";
  }
  const token = getCookie(event, "token");
  const tokenpwd = getCookie(event, "tokenpwd");
  if (!token || !tokenpwd) {
    return {
      error: "NO_TOKEN",
    };
  }
  try {
    const req = await fetch(
      `https://www.smartsolity.com/api_v2/controlDevice/${door.trim()}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",

          "User-Agent": "okhttp/4.9.1",
          Authorization: token,
          AuthorizationPwd: tokenpwd,
          "Accept-Encoding": "gzip",
        },
        body: JSON.stringify({
          controlType: "open",
          optionValue: "1",
        }),
      },
    );
    const res = await req.text();
    return res;
  } catch (e) {
    console.log(e);
    return {
      e: e.message,
      error: "SERVER_SIDE_ERROR",
    };
  }
});
