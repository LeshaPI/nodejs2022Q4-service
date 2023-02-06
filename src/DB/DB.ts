/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { User } from '../users/types/users.shema';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from '../users/types/user.dto';
import { Artist } from '../artists/types/artist.shema';
import { ArtistDto } from '../artists/types/artist.dto';
import { Track } from '../tracks/types/track.shema';
import { createTrackDto } from '../tracks/types/track.dto';

@Injectable()
export default class DB {
  users: User[] = [];
  artists: Artist[] = [];
  tracks: Track[] = [];

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
      if(id === track.artistId){
        track.artistId = null;
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

    if (track) {
      this.tracks.splice(index, 1);
    }

    return track;
  }
}
