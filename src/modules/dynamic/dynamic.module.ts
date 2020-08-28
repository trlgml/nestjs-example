import { DynamicModule as Dynamic, Module } from '@nestjs/common';
import { DynamicService } from './dynamic.service';

@Module({
  providers: [DynamicService]
})
export class DynamicModule {
  static register(option): Dynamic {
    return {
      module: DynamicModule,
      providers: [
        {
          provide: 'DYNAMIC_OPTIONS',
          useValue: option,
        },
        DynamicService,
      ],
      exports: [DynamicService],
    };
  }
}
