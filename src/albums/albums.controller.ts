import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { albumDto } from './types/album.dto';
import { Album } from './types/album.shema';

@Controller('album')
export class AlbumsController {
    constructor(private albumsService: AlbumsService) {}

    @Get()
    async getAll(): Promise<Album[]> {
        return await this.albumsService.getAll();
    }

    @Get(':id')
    async getAlbum(@Param('id', new ParseUUIDPipe()) id: string): Promise<Album> {
        return await this.albumsService.getAlbum(id)
    }

    @Post() 
    async createAlbum(@Body() createAlbumDto: albumDto): Promise<Album> {
        return await this.albumsService.createAlbum(createAlbumDto);
    }

    @Put(':id')
    async updateAlbum(
        @Body() updateAlbumDto: albumDto,
        @Param('id', new ParseUUIDPipe()) id: string
    ): Promise<Album> {
        return await this.albumsService.updateAlbum( id, updateAlbumDto);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    async deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.albumsService.deleteAlbum(id);
    }
}
