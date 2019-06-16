declare module "common" {
  interface Request {
    body?
    headers;
    ip: string;
    params?;
    query?;
  }

  interface Response {
    body?
    headers;
    statusCode: number;
  }

  interface SchemaBuilder extends Joi {
    string(): import('joi').StringSchema;
    object(schema?): import('joi').AnySchema;
  }

  type HTTPController = (httpRequest: import('common').Request) => Promise<import('common').Response | Error>

  type KoaController = (ctx: import('koa').ParameterizedContext) => Promise<void>
}
