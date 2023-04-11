import * as puppeteer from 'puppeteer';
import Fastify, { FastifyServerOptions } from 'fastify';
import fastifyMiddie from '@fastify/middie';
import fastifyStatic from '@fastify/static';
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import { fileURLToPath } from 'url';
import path from 'path';
import AutoLoad from '@fastify/autoload';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
// This is the path to the server entry point (astro build entry)
import { handler as ssrHandler } from '../dist/server/entry.mjs';

const opts: FastifyServerOptions = {
  logger: true,
};
const app = Fastify(opts).withTypeProvider<TypeBoxTypeProvider>();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await app
  .register(fastifyStatic, {
    root: fileURLToPath(new URL('../dist/client', import.meta.url)),
  })
  .register(fastifyMiddie)
  .register(AutoLoad, {
    dir: path.join(__dirname, 'api'),
    options: opts
  })
  .register(cors)
  .register(helmet)
  .register(AutoLoad, {
  dir: path.join(__dirname, 'api'),
  options: { prefix: '/api', ...opts }
});

app.use(ssrHandler);

app.get('/pdf', async (request, reply) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8080', {waitUntil: 'networkidle0'});
  const pdf = await page.pdf({printBackground: true});
  browser.close();

  reply.header('Content-Type', 'application/pdf');
  return pdf;
});

app.listen({ port: 8080 });
