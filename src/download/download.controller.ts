import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { exec } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
@Controller('')
export class DownloadController {
  @Get('download')
  downloadVideo(
    @Query('url') url: string,
    @Query('type') type: string,
    @Res() res: Response,
  ) {
    if (!url) return res.status(400).send('Missing YouTube URL');

    const fileName =
      type === 'audio' ? `audio-${Date.now()}.mp3` : `video-${Date.now()}.mp4`;
    // const filePath = path.join(
    //   __dirname,
    //   '..',
    //   '..',
    //   '..',
    //   'downloads',
    //   fileName,
    // );
    const filePath = path.join('/tmp', fileName);

    const format =
      type === 'audio' ? '140/251/250/249' : '22/136+140/135+140/18/17';
    const command = `yt-dlp --cookies cookies.txt -f ${format} -o "${filePath}" "${url}"`;

    exec(command, (error) => {
      if (error || !fs.existsSync(filePath)) {
        console.error('Download failed:', error);
        return res.status(500).json({ message: 'Download failed' });
      }

      res.download(filePath, fileName, () => {
        fs.unlinkSync(filePath); // Clean up
      });
    });
  }
}
