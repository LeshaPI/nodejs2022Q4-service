import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Track } from './types/track.shema';
import DB from '../DB/DB';
import { createTrackDto } from './types/track.dto';

@Injectable()
export class TracksService {
    constructor(private database: DB) {}

    async getAll (): Promise<Track[]> {
        return this.database.tracks;
    }

    async getTrack (id: string): Promise<Track> {

        const track = this.database.getOneTrack(id);

        if (!track) {
            throw new HttpException("track doesn't exist", HttpStatus.NOT_FOUND);
        }

        return track;
    }

    async createTrack ( trackDto: createTrackDto ): Promise<Track> {
        return this.database.setTrack( trackDto );
    }

    async updateTrack (id: string, trackDto: createTrackDto): Promise<Track> {
        const track = this.database.getOneTrack(id);
        if (!track) {
          throw new HttpException("track doesn't exist", HttpStatus.NOT_FOUND);
        }
    
    
        if (track.id === id) {
            track.name = trackDto.name;
            track.duration = trackDto.duration;
            track.artistId = trackDto.artistId;
            track.albumId = trackDto.albumId;
        } 
    
        this.database.udateTrack(track);
        return track;
    }

    async deleteTrack(id: string) {
        const deleted = this.database.deleteTrack(id);
        if (!deleted) {
            throw new HttpException("track doesn't exist", HttpStatus.NOT_FOUND);
        }
    }
}
