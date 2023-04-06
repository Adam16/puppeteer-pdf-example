# Astro v2.x

Static site generator

## Integration node

- https://docs.astro.build/en/guides/integrations-guide/node/

### Installation

Add the Node adapter to enable SSR in your Astro project with the following astro add command. This will install the adapter and make the appropriate changes to your astro.config.mjs file in one step.

`npm install @astrojs/node`

Add two new lines to your astro.config.mjs project configuration file.

```
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
});
```
### Mode

Controls whether the adapter builds to middleware or standalone mode.

- `middleware` - to be used as middleware in an existing server
- `standalone` - to be used as a standalone server

#### Fastify

```
import Fastify from 'fastify';
import fastifyMiddie from '@fastify/middie';
import fastifyStatic from '@fastify/static';
import { fileURLToPath } from 'url';
import { handler as ssrHandler } from './dist/server/entry.mjs';

const app = Fastify({ logger: true });

await app
  .register(fastifyStatic, {
    root: fileURLToPath(new URL('./dist/client', import.meta.url)),
  })
  .register(fastifyMiddie);
app.use(ssrHandler);

app.listen({ port: 8080 });
```

#### Express

```
import express from 'express';
import { handler as ssrHandler } from './dist/server/entry.mjs';

const app = express();
app.use(express.static('dist/client/'))
app.use(ssrHandler);

app.listen(8080);
```
