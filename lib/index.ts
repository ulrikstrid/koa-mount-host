import Koa from "koa";
import compose from "koa-compose";

/**
 * mount `app` on `host`.
 *
 * @param {String} host
 * @param {Application} app
 * @return {Function}
 * @api public
 */

const mount = <T>(host: string, app: Koa): Koa.Middleware => {
  const downstream = compose(app.middleware);

  return async (ctx: Koa.Context, upstream: () => Promise<T>) => {
    if (ctx.host !== host) {
      return await upstream();
    }

    await downstream(ctx, upstream);
  };
};

export default mount;
