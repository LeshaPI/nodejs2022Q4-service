import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { createTrackDto } from './types/track.dto';
import { Track } from './types/track.shema';

@Controller('track')
export class TracksController {
    constructor(private tracksService: TracksService) {}

    @Get()
    async getAll(): Promise<Track[]> {
        return await this.tracksService.getAll();
    }

    @Get(':id')
    async getTrack(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.tracksService.getTrack(id);
    }

    @Post()
    async createTrack(@Body() trackDto: createTrackDto): Promise<Track> {
        return this.tracksService.createTrack(trackDto);
    }

    @Put(':id')
    async updateTrack(
        @Body() trackDto: createTrackDto,
        @Param('id', new ParseUUIDPipe()) id: string
    ): Promise<Track> {
        return this.tracksService.updateTrack(id, trackDto);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    async deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.tracksService.deleteTrack(id);
    }

}
