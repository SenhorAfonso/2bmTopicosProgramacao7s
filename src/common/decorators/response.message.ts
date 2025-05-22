import { HttpStatus, SetMetadata } from '@nestjs/common';

export const RESPONSE_MESSAGE = 'response_message';
export const RESPONSE_STATUS = 200;

export const ResponseMessage = (
  message: string,
  status: number = HttpStatus.OK,
) => {
  return (
    target: object,
    key?: string | symbol,
    descriptor?: PropertyDescriptor,
  ) => {
    SetMetadata(RESPONSE_MESSAGE, message)(target, key, descriptor);
    SetMetadata(RESPONSE_STATUS, status)(target, key, descriptor);
  };
};
