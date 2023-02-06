import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistDto } from './types/artist.dto';
import { Artist } from './types/artist.shema';

@Controller('artist')
export class ArtistsController {
    constructor(private artistsServise: ArtistsService) {}

    @Get()
    async getAll() {
        return await this.artistsServise.getAll();
    }

    @Get(':id')
    async getArtist(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.artistsServise.getArtist(id);
    }

    @Post()
    async createArtist(@Body() createArtistDto: ArtistDto): Promise<Artist> {
        return await this.artistsServise.createArtists( createArtistDto )
    }

    @Put(':id')
    async updateArtist (
        @Body() createArtistDto: ArtistDto,
        @Param('id', new ParseUUIDPipe()) id: string
    ): Promise< Artist > {
        return await this.artistsServise.updateArtist( id, createArtistDto );
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    async deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.artistsServise.deleteArtist(id);
    }
}
