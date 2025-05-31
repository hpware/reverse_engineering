export default defineEventHandler(async (event) => {
  const token = getCookie(event, "token");
  const tokenpwd = getCookie(event, "tokenpwd");
  if (!token || !tokenpwd) {
    return {
      error: "NO_TOKEN",
    };
  }
  try {
    const req = await fetch("https://www.smartsolity.com/api_v2/myDevice", {
      method: "GET",
      headers: {
        "User-Agent": "okhttp/4.9.1",
        Authorization: token,
        AuthorizationPwd: tokenpwd,
      },
    });
    const res = await req.json();
    const devices = res.contents;
    return devices;
  } catch (e) {
    console.log(e);
    return {
      e: e.message,
      error: "SERVER_SIDE_ERROR",
    };
  }
});
