/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { User } from '../users/types/users.shema';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from '../users/types/user.dto';
import { Artist } from '../artists/types/artist.shema';
import { ArtistDto } from '../artists/types/artist.dto';
import { Track } from '../tracks/types/track.shema';
import { createTrackDto } from '../tracks/types/track.dto';
import { Album } from '../albums/types/album.shema';
import { albumDto } from '../albums/types/album.dto';
import { Favorite, FavoriteResponce } from '../favorites/types/favorites.shema';
import { findFavs } from '../utils/findFavs';
import { ALBUM, ARTIST, TRACK } from '../utils/consts';

@Injectable()
export default class DB {
  users: User[] = [];
  artists: Artist[] = [];
  tracks: Track[] = [];
  albums: Album[] = [];
  favorites: Favorite = {
    artists: [],
    albums: [],
    tracks: []
  };

  getOneUser(id) {
    for (let user of this.users) {
      if (user.id === id) {
        return user;
      }
    }
  }

  setUser(userDto: CreateUserDto) {
    const updatedUser: User = {
      id: uuidv4(),
      ...userDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.users.push(updatedUser);
    return updatedUser;
  }

  udateUser(user: User) {
    const index = this.users.findIndex((dbUser) => dbUser.id === user.id);
    this.users.splice(index, 1, user);
  }

  deleteUser(id: string) {
    const index = this.users.findIndex((dbUser) => dbUser.id === id);
    const user = this.users[index];
    if (user) {
      this.users.splice(index, 1);
    }

    return user;
  }


  setArtists(userDto: ArtistDto) {
    const updatedArtist: Artist = {
      id: uuidv4(),
      ...userDto,
    };

    this.artists.push(updatedArtist);
    return updatedArtist;
  }

  getOneArtist(id) {
    for (let artist of this.artists) {
      if (artist.id === id) {
        return artist;
      }
    }
  }

  udateArtist(artist: Artist) {
    const index = this.artists.findIndex((dbArtist) => dbArtist.id === artist.id);
    this.artists.splice(index, 1, artist);
  }

  deleteArtist(id: string) {
    const index = this.artists.findIndex((dbArtist) => dbArtist.id === id);
    const artist = this.artists[index];

    for(let track of this.tracks) {
      if(id === track.artistId) {
        track.artistId = null;
      }
    }

    for(let album of this.albums) {
      if(id === album.artistId) {
        album.artistId = null;
      }
    }

    for(let i = 0; i < this.favorites.artists.length; i++){
      if(id === this.favorites.artists[i]){
        this.favorites.artists.splice(i, 1);
      }
    }

    if (artist) {
      this.artists.splice(index, 1);
    }

    return artist;
  }

  getOneTrack(id) {
    for (let track of this.tracks) {
      if (track.id === id) {
        return track;
      }
    }
  }


  setTrack(trackDto: createTrackDto) {
    const updatedTrack: Track = {
      id: uuidv4(),
      ...trackDto
    }

    this.tracks.push(updatedTrack);
    return updatedTrack;
  }

  udateTrack(track: Track) {
    const index = this.tracks.findIndex((dbTrack) => dbTrack.id === track.id);
    this.tracks.splice(index, 1, track);
  }

  deleteTrack(id: string) {
    const index = this.tracks.findIndex((dbTrack) => dbTrack.id === id);
    const track = this.tracks[index];

    for(let i = 0; i < this.favorites.tracks.length; i++){
      if(id === this.favorites.tracks[i]){
        this.favorites.tracks.splice(i, 1);
      }
    }

    if (track) {
      this.tracks.splice(index, 1);
    }

    return track;
  }

  getOneAlbum(id) {
    for (let album of this.albums) {
      if (album.id === id) {
        return album;
      }
    }
  }

  setAlbum(albumDto: albumDto) {
    const updatedTrack: Album = {
      id: uuidv4(),
      ...albumDto
    }

    this.albums.push(updatedTrack);
    return updatedTrack;
  }

  udateAlbum(album: Album) {
    const index = this.albums.findIndex((dbAlbums) => dbAlbums.id === album.id);
    this.albums.splice(index, 1, album);
  }

  deleteAlbum(id: string) {
    const index = this.albums.findIndex((dbAlbum) => dbAlbum.id === id);
    const album = this.albums[index];

    for(let track of this.tracks) {
      if( track.albumId === id ) {
        track.albumId = null;
      }
    }

    for(let i = 0; i < this.favorites.albums.length; i++){
      if(id === this.favorites.albums[i]){
        this.favorites.albums.splice(i, 1);
      }
    }

    if (album) {
      this.albums.splice(index, 1);
    }

    return album;
  }

  getAllFavorites() {
    const favs: FavoriteResponce = {
      artists: findFavs(this.artists, this.favorites.artists),
      albums: findFavs(this.albums, this.favorites.albums),
      tracks: findFavs(this.tracks, this.favorites.tracks)
    };

    return favs;
  }

  addToFavs(id:string, type: string) {

    let isExist = false;

    switch(type){
      case ARTIST: {
        const index = this.artists.findIndex((dbArtist) => dbArtist.id === id);
        const artist = this.artists[index];
        if(artist) {
          isExist = true;
          this.favorites.artists.push(id);
        }
      break;
      }
      case ALBUM:{
        const index = this.albums.findIndex((dbAlbum) => dbAlbum.id === id);
        const album = this.albums[index];
        if(album) {
          isExist = true;
          this.favorites.albums.push(id);
        }
      break;
      }
      case TRACK:{
        const index = this.tracks.findIndex((dbTrack) => dbTrack.id === id);
        const track = this.tracks[index];
        if(track) {
          isExist = true;
          this.favorites.tracks.push(id);
        }
      break;
      }
    }

    return isExist;
  }

  deleteFromFavs(id, type) {
    let isExist = false;

    switch(type){
      case ARTIST: {
        const index = this.artists.findIndex((dbArtist) => dbArtist.id === id);
        const artist = this.artists[index];
        const indexOfFav = this.favorites.artists.findIndex((db) => db === id);
        if(artist) {
          isExist = true;
          this.favorites.artists.splice(indexOfFav, 1);
        }
        break;
      }
      case ALBUM:{
        const index = this.albums.findIndex((dbAlbum) => dbAlbum.id === id);
        const album = this.albums[index];
        const indexOfFav = this.favorites.albums.findIndex((db) => db === id);
        if(album) {
          isExist = true;
          this.favorites.albums.splice(indexOfFav, 1);
        }
        break;
      }
      case TRACK:{
        const index = this.tracks.findIndex((dbTrack) => dbTrack.id === id);
        const track = this.tracks[index];
        const indexOfFav = this.favorites.tracks.findIndex((db) => db === id);
        if(track) {
          isExist = true;
          this.favorites.tracks.splice(indexOfFav, 1);
        }
        break;
      }
    }

    return isExist;
  }
}
