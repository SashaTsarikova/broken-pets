// Status 3
import psl from 'psl';
import url from 'url';

import config from 'config';
import { COOKIES } from 'app.constants';
import { AppKoaContext } from 'types';

export const setTokenCookies = ({
  ctx,
  accessToken,
}: { ctx: AppKoaContext, accessToken: string }) => {
  const parsedUrl = url.parse(config.WEB_URL);
  
  if (!parsedUrl.hostname) {
    return;
  }

  const parsed = psl.parse(parsedUrl.hostname) as psl.ParsedDomain;
  const cookiesDomain = parsed.domain || undefined;

  ctx.cookies.set(COOKIES.ACCESS_TOKEN, accessToken, {
    httpOnly: true,
    domain: cookiesDomain,
    expires: new Date(0),
  });
};

export const unsetTokenCookies = (ctx: AppKoaContext) => {
  ctx.cookies.set(COOKIES.ACCESS_TOKEN);
};

export default {
  setTokenCookies,
  unsetTokenCookies,
};
