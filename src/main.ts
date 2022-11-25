import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as bodyParser from "body-parser";
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from "@nestjs/swagger";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });

  app.useStaticAssets(join(__dirname, "..", "public"));

  const config = new DocumentBuilder()
    .setTitle("VISIONZE")
    .setDescription("The Paso Paso API")
    .setVersion("1.0")
    .addTag("Auth")
    .addBearerAuth(
      { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      "JWT"
    )
    .build();

  const options: SwaggerDocumentOptions = {
    deepScanRoutes: true,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup("/api", app, document);
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  app.use((req, res, next) => {
    const protocol = req.protocol;
    const host = req.hostname;
    req.appUrl = `${protocol}://${host}`;
    return next();
  });
  // app.enableCors();
  await app.listen(process.env.PORT || 3000);
  // return await runMigrations(app);
 
}
bootstrap();
