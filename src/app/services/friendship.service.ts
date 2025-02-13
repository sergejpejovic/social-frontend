import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FriendshipService {
  constructor(private http: HttpClient) {}

  profileRequest(profileRequest: number, profileAccept: number) {
    return this.http.post(
      `http://localhost:4000/friendship/request/${profileRequest}`,
      { profileAccept }
    );
  }

  acceptRequest(profileRequest: number, profileAccept: number) {
    return this.http.put(
      `http://localhost:4000/friendship/request/${profileRequest}/accept`,

      { profileAccept }
    );
  }

  rejectRequest(profileRequest: number, profileAccept: number) {
    return this.http.put(
      `http://localhost:4000/friendship/request/${profileRequest}/reject`,

      { profileAccept }
    );
  }
}
