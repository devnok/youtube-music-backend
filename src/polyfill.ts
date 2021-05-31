/* eslint-disable @typescript-eslint/naming-convention*/
import { compact, map } from 'lodash';

import { BaseDto } from './base/dto/base.dto';
import { BaseEntity } from './base/base.entity';

declare global {
  interface Array<T> {
    toDtos<T extends BaseEntity<Dto>, Dto extends BaseDto>(
      this: T[],
      options?: any,
    ): Dto[];
  }
}

Array.prototype.toDtos = function <
  T extends BaseEntity<Dto>,
  Dto extends BaseDto
>(): Dto[] {
  return compact(
    map<T, Dto>(this, (item) => item.toDto()),
  );
};
