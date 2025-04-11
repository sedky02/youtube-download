import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { exec } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
@Controller('download')
export class DownloadController {
  @Get('video')
  downloadVideo(@Query('url') url: string, @Res() res: Response) {
    if (!url) return res.status(400).send('Missing YouTube URL');

    const fileName = `video-${Date.now()}.mp4`;
    const filePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'downloads',
      fileName,
    );

    // Make sure path separators are escaped properly for shell
    const normalizedFilePath = filePath.replace(/\\/g, '/');

    const command = `yt-dlp --cookies cookies.txt -f "22/136+140/135+140/18/17" -o "${normalizedFilePath}" "${url}"`;

    exec(command, (error) => {
      if (error || !fs.existsSync(filePath)) {
        console.error('Download failed:', error);
        return res.status(500).send('Download failed');
      }

      res.download(filePath, fileName, () => {
        fs.unlinkSync(filePath); // Clean up
      });
    });
  }
}
