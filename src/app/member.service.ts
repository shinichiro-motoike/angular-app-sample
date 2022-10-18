import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Member } from './member';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private memberUrl = 'api/members';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.memberUrl).pipe(
      tap((members) => this.log('Get employee list data')),
      catchError(this.handleError<Member[]>('getMembers', []))
    );
  }

  getMember(id: number): Observable<Member> {
    const url = `${this.memberUrl}/${id}`;
    return this.http.get<Member>(url).pipe(
      tap((_) => this.log(`Get employee list data (id=${id})`)),
      catchError(this.handleError<Member>(`getMember id=${id}`))
    );
  }

  updateMember(member: Member): Observable<any> {
    return this.http.put(this.memberUrl, member, this.httpOptions).pipe(
      tap((_) => this.log(`Change employee data (id=${member.id})`)),
      catchError(this.handleError<any>('updateMember'))
    );
  }

  addMember(member: Member): Observable<Member> {
    return this.http
      .post<Member>(this.memberUrl, member, this.httpOptions)
      .pipe(
        tap((newMember: Member) =>
          this.log(`Add employee data (id=${newMember.id})`)
        ),
        catchError(this.handleError<Member>('addMember'))
      );
  }

  deleteMember(member: Member | number): Observable<Member> {
    const id = typeof member === 'number' ? member : member.id;
    const url = `${this.memberUrl}/${id}`;

    return this.http.delete<Member>(url, this.httpOptions).pipe(
      tap((_) => this.log(`Delete employee data  (id=${id})`)),
      catchError(this.handleError<Member>(`deleteMember`))
    );
  }

  searchMembers(term: string): Observable<Member[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Member[]>(`${this.memberUrl}/?name=${term}`).pipe(
      tap((_) => this.log(`Employee data matching ${term} was found`)),
      catchError(this.handleError<Member[]>('searchMembers', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`MemberService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} Failure: ${error.massage}`);
      return of(result as T);
    };
  }
}
