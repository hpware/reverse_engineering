import crypto from "crypto";

function hashPassword(password: string): string {
  const hash = crypto.createHash("sha256");
  hash.update(password);
  return hash.digest("base64");
}
export default defineEventHandler(async (event) => {
  if (event.method !== "POST") {
    return {
      error: "ERR_METHOD_NOT_ALLOWED",
    };
  }
  const body = await readBody(event);
  if (!body.password && !body.username) {
    return {
      error: "ERR_NO_PWD_OR_USRNAME",
    };
  }
  try {
    const req = await fetch("https://www.smartsolity.com/api_v2/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "okhttp/4.9.1",
      },
      body: JSON.stringify({
        appSource: "3",
        emailId: body.username,
        hashedPwd: hashPassword(body.password),
        lang: "1",
        phoneToken: "0125b4e40d5f4d76",
      }),
    });
    const res = await req.json();
    console.log(res);
    const details = res.contents;
    const memberInfo = res.contents.memberInfo;
    setCookie(event, "token", details.token);
    setCookie(event, "tokenpwd", details.tokenPwd);
    return {
      token: details.token,
      password: details.tokenPwd,
      member_id: memberInfo.memberId,
      user: memberInfo.emailId,
    };
  } catch (e) {
    return {
      e: e.message,
      error: "SERVER_SIDE_ERROR",
    };
  }
});
