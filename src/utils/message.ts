enum StatusCode {
  success = 200,
  error = 400
}

class Result {
  private statusCode: number;
  private code: number;
  private message: string;
  private data?: object;

  constructor(statusCode: number, message: string, data?: object) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  bodyToString () {
    return {
      statusCode: this.statusCode,
      body: JSON.stringify({
        message: this.message,
        data: this.data,
      }),
    };
  }
}

export class MessageUtil {
  static success(data: object) {
    const result = new Result(StatusCode.success, 'success', data);

    return result.bodyToString();
  }

  static error(message: string, data: object|undefined = undefined) {
    const result = new Result(StatusCode.error, message, data);

    return result.bodyToString();
  }
}
