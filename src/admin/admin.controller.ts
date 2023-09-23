import { Controller, Get, Header, HttpCode, Param, Post, Query, Redirect, Req, Res } from '@nestjs/common';

// Sub-Domain Routing

//@Controller('admin')
@Controller({ host: 'admin.example.com' }) // cant understand 

export class AdminController {
  @Get()
  index():string {
    return "Admin Page";
  }
}
