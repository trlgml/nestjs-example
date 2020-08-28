import { SetMetadata } from '@nestjs/common';
type TMessage = string

export const Handle = (message) => {
  return (_, __, descriptor: PropertyDescriptor) => {
    const errMessage: TMessage = message + '失败';
    const successMessage: TMessage = message + '成功';
    SetMetadata('__customHttpMessage__', successMessage)(descriptor.value)
    SetMetadata('__customHttpErrorMessage__', errMessage)(descriptor.value)
    return descriptor;
  };

}