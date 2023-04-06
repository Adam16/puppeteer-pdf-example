import * as puppeteer from 'puppeteer';
import Fastify from 'fastify';
import fastifyMiddie from '@fastify/middie';
import fastifyStatic from '@fastify/static';
import { fileURLToPath } from 'url';
// This is the path to the server entry point (astro build entry)
import { handler as ssrHandler } from '../dist/server/entry.mjs';

const app = Fastify({ logger: true });

await app
  .register(fastifyStatic, {
    root: fileURLToPath(new URL('../dist/client', import.meta.url)),
  })
  .register(fastifyMiddie);
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
