import { Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ALBUM, ARTIST, TRACK } from '../utils/consts';
import { FavoritesService } from './favorites.service';
import { FavoriteResponce } from './types/favorites.shema';

@Controller('favs')
export class FavoritesController {
    constructor(private favoritesServise: FavoritesService) {}

    @Get()
    async getAll(): Promise<FavoriteResponce> {
        return await this.favoritesServise.getAll();
    }

    @Post('artist/:id')
    async addArtistToFavs(@Param('id', new ParseUUIDPipe()) id: string) {
        await this.favoritesServise.addToFavs(id, ARTIST);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('artist/:id')
    async deleteArtistFromFavs(@Param('id', new ParseUUIDPipe()) id: string) {
        await this.favoritesServise.deleteFromFavs(id, ARTIST);
    }

    @Post('track/:id')
    async addTrackToFavs(@Param('id', new ParseUUIDPipe()) id: string) {
        await this.favoritesServise.addToFavs(id, TRACK);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('track/:id')
    async deleteTrackFromFavs(@Param('id', new ParseUUIDPipe()) id: string) {
        await this.favoritesServise.deleteFromFavs(id, TRACK);
    }

    @Post('album/:id')
    async addAlbumToFavs(@Param('id', new ParseUUIDPipe()) id: string) {
        await this.favoritesServise.addToFavs(id, ALBUM);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('album/:id')
    async deleteAlbumFromFavs(@Param('id', new ParseUUIDPipe()) id: string) {
        await this.favoritesServise.deleteFromFavs(id, ALBUM);
    }
}
