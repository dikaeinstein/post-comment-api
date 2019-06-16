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
}
