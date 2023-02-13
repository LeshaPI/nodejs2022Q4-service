import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import DB from '../DB/DB';
import { FavoriteResponce } from './types/favorites.shema';

@Injectable()
export class FavoritesService {
    constructor(private database: DB) {}

    async getAll(): Promise<FavoriteResponce> {
        return this.database.getAllFavorites();
    }

    async addToFavs( id:string, type:string ) {
        const isExist = this.database.addToFavs(id, type);
        
        if(!isExist) {
            throw new HttpException("id doesn't exist", HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async deleteFromFavs(id: string, type: string) {
        const isExist = this.database.deleteFromFavs(id, type);

        if(!isExist) {
            throw new HttpException("id doesn't exist", HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

}
