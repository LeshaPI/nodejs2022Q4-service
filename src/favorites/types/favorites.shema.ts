import { Artist } from "../../artists/types/artist.shema";
import { Album } from "../../albums/types/album.shema";
import { Track } from "../../tracks/types/track.shema";

export class Favorite {
    artists: string[]; // favorite artists ids
    albums: string[]; // favorite albums ids
    tracks: string[]; // favorite tracks ids
}

export class FavoriteResponce {
    artists: Artist[];
    albums: Album[];
    tracks: Track[];
}