import { HttpStatus, Body, Controller, Get, Header, HttpCode, Param, Post, Query, Redirect, Req, Res } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { CreateCatDto } from 'src/cats/dto/create-cat.dto';
import { Response } from 'express';
import { CatsService } from './cats.service';
import { Cat } from 'src/cats/interfaces/cat.interface';

@Controller('cats')
export class CatsController {

  constructor(private  catsService :  CatsService){
    // amra ekhon catsService ke ei controller er moddhe
    // use korte parbo 
    /**
     * Nest will resolve the catsService by creating and returning an instance of CatsService (or, in the normal case of a singleton, returning the existing instance if it has already been requested elsewhere). This dependency is resolved and passed to your controller's constructor (or assigned to the indicated property):
     */
  }

  // @HttpCode(200) //  
  @Get() // 🟢
  /**
   * In order to take advantage of express typings
   *  (as in the request: Request parameter example above), 
   * install @types/express package.
   */
  findAll(@Req() request : Request):string {
    return " we are in /cats -> GET . This action returns all cat"
  }

  @Get('breed') // 🟢
  catBreed():string {
    return "we are in cats/breed -> GET"
  }

  
  
  @Get('ab*cd') // 🟢
  routeWildCards() {
    
    return 'This route uses a wildcard . The "ab*cd" route path will match abcd, ab_cd, abecd, ab-cd ab cd and so on.';
  }

  //normal Redirect and dynamic redirect
  @Get('docs') // 🟢
  @Redirect('https://nestjs.com', 301) 
  getDocs(@Query('version') version :string): (object |string) {
    if(version && version === '5'){
        return {
           url : 'https://docs.nestjs.com/v5/'
          }
    }
    return "Redirect to nestjs website"
  }

  

  // Async Await Promise
  /**
   * Every async function has to return a Promise. This means
   * that you can return a deferred value that Nest will be 
   * able to resolve by itself
   */

  
  @Get('findAllAsync') // 🟢🟢
  async findAllAsync():Promise<Cat[]>{
    //return [];
    return this.catsService.findAllAsync();
  }
  

  /**
   * 
   * Nest route handlers are even more powerful by being able
   * to return RxJS observable streams. Nest will automatically
   * subscribe to the source underneath and take the last emitted
   * value (once the stream is completed).
   */
  
  
  @Get('findAllObservable') // 🟢
  findAllObservable(): Observable<any[]> {
    return of([]);
  }

  

  @Post('create') // 🟢🟢
  async create(@Body() createCatDto: CreateCatDto) {
     //return 'This action adds a new cat';
     this.catsService.create(createCatDto);
  }

  @Post() // 🟢
  @HttpCode(204) // 204 means that the server successfully processed the client's request, and that the server is not returning any content.
  @Header('Cache-Control', 'none')
  createCat(@Body() createCatDto: CreateCatDto):string{
    return "/cats -> POST . This action adds a new cat "
  }


  // manipulating the response is to use a library-specific
  // response object. In order to inject a particular response object,
  // we need to use the @Res() decorator.

  
  @Post('createCatAgain') // 🟢
  createCatAgain(@Res() res: Response){
    res.status(HttpStatus.CREATED).send("create done by using response object");
  }


  @Get('getAllCat') // 🔴
  getAllCat(@Res() res: Response) {
     res.status(HttpStatus.OK).json([]);
  }


  
  /**
   * this gives us more control over response object .. 
   * we can do headers manupulation and library specific feature
   * 
   * but we lose compatibility with Nest features that depend on 
   * Nest standard response handling, such as Interceptors and 
   * @HttpCode() / @Header() decorators. To fix this, you can 
   * set the passthrough option to true, as follows:
   */

  
  @Get('findAllAgain') // 🟢
  findAllAgain(@Res({ passthrough: true }) res: Response) {
    res.status(HttpStatus.OK);
    return [{
      name:"mohammad"
    }];
    // return "this line also works";
  }

  @Get(':id')// 🟢 // parameter ke shobar last e rakhte hobe 
  // findOne(@Param('id') params :any) : string{
    findOne(@Param() params :any) : string{
    if(params.id == undefined){
      return  `from else -> cats/:id ->  cats/${params} `;
    }else{
      return  `from if -> cats/:id ->  cats/${params.id} `;
    }
    
  }
  

}
