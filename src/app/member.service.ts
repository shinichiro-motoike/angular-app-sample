import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Member } from './member';
import { MessageService } from './message.service';
import { MEMBERS } from './mock-members';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private memberUrl = 'api/members';
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getMembers(): Observable<Member[]> {
    this.messageService.add('MemberService: Get employee list data');
    return this.http.get<Member[]>(this.memberUrl);
  }

  getMember(id: number): Observable<Member> {
    this.messageService.add(`MemberService: Get employee list data (id=${id})`);
    return of(MEMBERS.find((member) => member.id === id));
  }

  private log(message: string) {
    this.messageService.add(`MemberService: ${message}`);
  }
}
