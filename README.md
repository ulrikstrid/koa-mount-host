# koa-mount-host

[![CircleCI](https://circleci.com/gh/ulrikstrid/koa-mount-host/tree/master.svg?style=svg)](https://circleci.com/gh/ulrikstrid/koa-mount-host/tree/master)

Mount a Koa app on a specified host.

**_Notice: only supports `koa@2`._**

## Installation

```
$ npm install koa-mount-host
```

## Examples

Mount a app on host `localhost:3000` so that it only matches when the host is `localhost:3000`.

```js
app.use(rewrite("localhost:3000", app2));
```

## License

MIT
