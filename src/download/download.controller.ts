import { Controller, Get } from '@nestjs/common';

@Controller('download')
export class DownloadController {
  @Get('video')
  downloadVideo() {}
}
