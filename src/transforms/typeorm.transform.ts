import { Provider, Inject } from '@nestjs/common';
import { Connection } from 'typeorm';
import { TYPEORM_CONNECTION_TOKEN, DB_MODEL_TOKEN_PERFIX } from '@app/constants/system.constant';

export function getModelToken(modelName: string): string {
  return DB_MODEL_TOKEN_PERFIX + modelName;
}


export function getProviderByModel(entity): Provider {
  return {
    provide: getModelToken(entity.name),
    useFactory: (connection: Connection) => connection.getRepository(entity),
    inject: [TYPEORM_CONNECTION_TOKEN],
  };
}


export function InjectModel(entity) {
  return Inject(getModelToken(entity.name));
}