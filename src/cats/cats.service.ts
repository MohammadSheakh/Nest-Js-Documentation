import { Injectable } from '@nestjs/common';
import { Cat } from 'src/cats/interfaces/cat.interface';

@Injectable()
export class CatsService {
  /**
   * This service will be responsible for data storage and retrieval, and is designed to be used by the CatsController, so it's a good candidate to be defined as a provider.
   */
  private readonly cats : Cat[] = [];

  create(cat:Cat){ // 🟢
      this.cats.push(cat);
  }
  
  findAllAsync() : Cat[]{ // 🟢
    return this.cats;
  }
}
