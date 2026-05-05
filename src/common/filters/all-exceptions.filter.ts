import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

export interface ApiError {
  status: 'error';
  code: number;
  data: null;
  message: string;
  errors?: Record<string, string[]>;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errors: Record<string, string[]> | undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const resp = exceptionResponse as Record<string, unknown>;
        
        // Manejar mensajes de error
        if (Array.isArray(resp.message)) {
          message = resp.message.join(', ');
          errors = { messages: resp.message as string[] };
        } else if (typeof resp.message === 'string') {
          message = resp.message;
        } else if (resp.error) {
          message = resp.error as string;
        } else {
          message = exception.message;
        }
      } else {
        message = exception.message;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      this.logger.error(`Unhandled error: ${exception.message}`, exception.stack);
    }

    const errorResponse: ApiError = {
      status: 'error',
      code: status,
      data: null,
      message,
      ...(errors && { errors }),
    };

    response.status(status).json(errorResponse);
  }
}