import { NestFactory } from '@nestjs/core'
import type { IncomingMessage, ServerResponse } from 'http'
import { AppModule } from './app.module'

type Handler = (req: IncomingMessage, res: ServerResponse) => void

let server: Promise<Handler> | undefined

/**
 * Boots Nest once per function instance (no `listen`, Vercel owns the HTTP
 * server) and reuses the Express app for every following request.
 */
const bootstrap = async (): Promise<Handler> => {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  await app.init()
  return app.getHttpAdapter().getInstance()
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  server ??= bootstrap()
  const app = await server
  return app(req, res)
}
