import { exit, getenv, puts } from "std";

export enum HttpStatusCode {
  CONTINUE = 100,
  SWITCHING_PROTOCOLS = 101,
  PROCESSING = 102,
  EARLY_HINTS = 103,
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NON_AUTHORITATIVE_INFORMATION = 203,
  NO_CONTENT = 204,
  RESET_CONTENT = 205,
  PARTIAL_CONTENT = 206,
  MULTI_STATUS = 207,
  ALREADY_REPORTED = 208,
  IM_USED = 226,
  MULTIPLE_CHOICES = 300,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  TEMPORARY_REDIRECT = 307,
  PERMANENT_REDIRECT = 308,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  PROXY_AUTHENTICATION_REQUIRED = 407,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  GONE = 410,
  LENGTH_REQUIRED = 411,
  PRECONDITION_FAILED = 412,
  PAYLOAD_TOO_LARGE = 413,
  URI_TOO_LONG = 414,
  UNSUPPORTED_MEDIA_TYPE = 415,
  RANGE_NOT_SATISFIABLE = 416,
  EXPECTATION_FAILED = 417,
  I_AM_A_TEAPOT = 418,
  MISDIRECTED_REQUEST = 421,
  UNPROCESSABLE_ENTITY = 422,
  LOCKED = 423,
  FAILED_DEPENDENCY = 424,
  TOO_ERARLY = 425,
  UPGRADE_REQUIRED = 426,
  PRECONDITION_REQUIRED = 428,
  TOO_MANY_REQUESTS = 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
  UNAVAILABLE_FOR_LEGAL_REASONS = 451,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  HTTP_VERSION_NOT_SUPPORTED = 505,
  VARIANT_ALSO_NEGOTIATES = 506,
  INSUFFICIENT_STORAGE = 507,
  LOOP_DETECTED = 508,
  NOT_EXTENDED = 510,
  NETWORK_AUTHENTICATION_REQUIRED = 511,
}

const HTTP_STATUS_CODE_NAMES: { [K in HttpStatusCode]: string } = {
  [HttpStatusCode.CONTINUE]: "Continue",
  [HttpStatusCode.SWITCHING_PROTOCOLS]: "Switching Protocols",
  [HttpStatusCode.PROCESSING]: "Processing",
  [HttpStatusCode.EARLY_HINTS]: "Early Hints",
  [HttpStatusCode.OK]: "OK",
  [HttpStatusCode.CREATED]: "Created",
  [HttpStatusCode.ACCEPTED]: "Accepted",
  [HttpStatusCode.NON_AUTHORITATIVE_INFORMATION]:
    "Non-Authoritative Information",
  [HttpStatusCode.NO_CONTENT]: "No Content",
  [HttpStatusCode.RESET_CONTENT]: "Reset Content",
  [HttpStatusCode.PARTIAL_CONTENT]: "Partial Content",
  [HttpStatusCode.MULTI_STATUS]: "Multi-Status",
  [HttpStatusCode.ALREADY_REPORTED]: "Already Reported",
  [HttpStatusCode.IM_USED]: "IM Used",
  [HttpStatusCode.MULTIPLE_CHOICES]: "Multiple Choices",
  [HttpStatusCode.MOVED_PERMANENTLY]: "Moved Permanently",
  [HttpStatusCode.FOUND]: "Found",
  [HttpStatusCode.SEE_OTHER]: "See Other",
  [HttpStatusCode.NOT_MODIFIED]: "Not Modified",
  [HttpStatusCode.TEMPORARY_REDIRECT]: "Temporary Redirect",
  [HttpStatusCode.PERMANENT_REDIRECT]: "Permanent Redirect",
  [HttpStatusCode.BAD_REQUEST]: "Bad Request",
  [HttpStatusCode.UNAUTHORIZED]: "Unauthorized",
  [HttpStatusCode.PAYMENT_REQUIRED]: "Payment Required",
  [HttpStatusCode.FORBIDDEN]: "Forbidden",
  [HttpStatusCode.NOT_FOUND]: "Not Found",
  [HttpStatusCode.METHOD_NOT_ALLOWED]: "Method Not Allowed",
  [HttpStatusCode.NOT_ACCEPTABLE]: "Not Acceptable",
  [HttpStatusCode.PROXY_AUTHENTICATION_REQUIRED]:
    "Proxy Authentication Required",
  [HttpStatusCode.REQUEST_TIMEOUT]: "Request Timeout",
  [HttpStatusCode.CONFLICT]: "Conflict",
  [HttpStatusCode.GONE]: "Gone",
  [HttpStatusCode.LENGTH_REQUIRED]: "Length Required",
  [HttpStatusCode.PRECONDITION_FAILED]: "Precondition Failed",
  [HttpStatusCode.PAYLOAD_TOO_LARGE]: "Payload Too Large",
  [HttpStatusCode.URI_TOO_LONG]: "URI Too Long",
  [HttpStatusCode.UNSUPPORTED_MEDIA_TYPE]: "Unsupported Media Type",
  [HttpStatusCode.RANGE_NOT_SATISFIABLE]: "Range Not Satisfiable",
  [HttpStatusCode.EXPECTATION_FAILED]: "Expectation Failed",
  [HttpStatusCode.I_AM_A_TEAPOT]: "I'm a teapot",
  [HttpStatusCode.MISDIRECTED_REQUEST]: "Misdirected Request",
  [HttpStatusCode.UNPROCESSABLE_ENTITY]: "Unprocessable Entity",
  [HttpStatusCode.LOCKED]: "Locked",
  [HttpStatusCode.FAILED_DEPENDENCY]: "Failed Dependency",
  [HttpStatusCode.TOO_ERARLY]: "Too Early",
  [HttpStatusCode.UPGRADE_REQUIRED]: "Upgrade Required",
  [HttpStatusCode.PRECONDITION_REQUIRED]: "Precondition Required",
  [HttpStatusCode.TOO_MANY_REQUESTS]: "Too Many Requests",
  [HttpStatusCode.REQUEST_HEADER_FIELDS_TOO_LARGE]:
    "Request Header Fields Too Large",
  [HttpStatusCode.UNAVAILABLE_FOR_LEGAL_REASONS]:
    "Unavailable For Legal Reasons",
  [HttpStatusCode.INTERNAL_SERVER_ERROR]: "Internal Server Error",
  [HttpStatusCode.NOT_IMPLEMENTED]: "Not Implemented",
  [HttpStatusCode.BAD_GATEWAY]: "Bad Gateway",
  [HttpStatusCode.SERVICE_UNAVAILABLE]: "Service Unavailable",
  [HttpStatusCode.GATEWAY_TIMEOUT]: "Gateway Timeout",
  [HttpStatusCode.HTTP_VERSION_NOT_SUPPORTED]: "HTTP Version Not Supported",
  [HttpStatusCode.VARIANT_ALSO_NEGOTIATES]: "Variant Also Negotiates",
  [HttpStatusCode.INSUFFICIENT_STORAGE]: "Insufficient Storage",
  [HttpStatusCode.LOOP_DETECTED]: "Loop Detected",
  [HttpStatusCode.NOT_EXTENDED]: "Not Extended",
  [HttpStatusCode.NETWORK_AUTHENTICATION_REQUIRED]:
    "Network Authentication Required",
};

const DEFAULT_CONTENT_TYPE = "application/json";

interface ResponseOptions {
  contentType?: string;
  statusCode?: HttpStatusCode;
  headers?: { [name: string]: string };
}

function putsHeaders(headers: Map<string, string>): void {
  for (const [k, v] of headers.entries()) {
    puts(`${k}: ${v}\r\n`);
  }
}

export function send(data: string, options: ResponseOptions): void {
  const { statusCode, contentType } = options;
  const defaultHeaders = new Map<string, string>([
    ["Status", `${statusCode} ${HTTP_STATUS_CODE_NAMES[statusCode]}`],
    ["Content-Type", contentType],
  ]);

  putsHeaders(defaultHeaders);
  puts("\r\n");
  puts(`${data}\r\n`);
}

export function error(data: any, options?: Partial<ResponseOptions>): void {
  send(stringify(data), {
    contentType: DEFAULT_CONTENT_TYPE,
    statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    ...options,
  });
  exit(1);
}

export function success(data: any, options?: Partial<ResponseOptions>): void {
  send(stringify(data), {
    contentType: DEFAULT_CONTENT_TYPE,
    statusCode: HttpStatusCode.OK,
    ...options,
  });
  exit(0);
}

function stringify(data: any): string {
  switch (typeof data) {
    case "string":
      return data;
    case "object":
      return JSON.stringify(data);
    default:
      return String(data);
  }
}

export function only(...methods: string[]): void {
  if (!methods.includes(REQUEST_METHOD)) {
    error(
      { error: `${REQUEST_METHOD} is not implemented` },
      {
        statusCode: HttpStatusCode.NOT_IMPLEMENTED,
      }
    );
  }
}

export const AUTH_CONTENT = getenv("AUTH_CONTENT");
export const AUTH_TYPE = getenv("AUTH_TYPE");
export const CONTENT_LENGTH = getenv("CONTENT_LENGTH");
export const CONTENT_TYPE = getenv("CONTENT_TYPE");
export const DOCUMENT_ROOT = getenv("DOCUMENT_ROOT");
export const HTTPS = getenv("HTTPS");
export const HTTP_ACCEPT = getenv("HTTP_ACCEPT");
export const HTTP_ACCEPT_ENCODING = getenv("HTTP_ACCEPT_ENCODING");
export const HTTP_COOKIE = getenv("HTTP_COOKIE");
export const HTTP_HOST = getenv("HTTP_HOST");
export const HTTP_IF_MODIFIED_SINCE = getenv("HTTP_IF_MODIFIED_SINCE");
export const HTTP_IF_NONE_MATCH = getenv("HTTP_IF_NONE_MATCH");
export const HTTP_REFERER = getenv("HTTP_REFERER");
export const HTTP_SCHEME = getenv("HTTP_SCHEME");
export const HTTP_USER_AGENT = getenv("HTTP_USER_AGENT");
export const PATH = getenv("PATH");
export const PATH_INFO = getenv("PATH_INFO");
export const QUERY_STRING = getenv("QUERY_STRING");
export const REMOTE_ADDR = getenv("REMOTE_ADDR");
export const REMOTE_USER = getenv("REMOTE_USER");
export const REQUEST_METHOD = getenv("REQUEST_METHOD");
export const REQUEST_URI = getenv("REQUEST_URI");
export const SCGI = getenv("SCGI");
export const SCRIPT_DIRECTORY = getenv("SCRIPT_DIRECTORY");
export const SCRIPT_FILENAME = getenv("SCRIPT_FILENAME");
export const SCRIPT_NAME = getenv("SCRIPT_NAME");
export const SERVER_NAME = getenv("SERVER_NAME");
export const SERVER_PORT = getenv("SERVER_PORT");
export const SERVER_PROTOCOL = getenv("SERVER_PROTOCOL");
export const SERVER_SOFTWARE = getenv("SERVER_SOFTWARE");
