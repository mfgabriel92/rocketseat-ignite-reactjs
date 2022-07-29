import { setCookie as nookieSetCookie } from "nookies";

function setCookies(name: string, value: string) {
  nookieSetCookie(undefined, `@rocketseatIgniteReactJSChapterIV_${name}`, value, {
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
}

export { setCookies };
