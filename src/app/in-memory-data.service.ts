import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Member } from './member';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const members = [
      { id: 1, name: 'Tom' },
      { id: 2, name: 'Ken' },
      { id: 3, name: 'Risa' },
      { id: 4, name: 'Taro' },
      { id: 5, name: 'Bob' },
      { id: 6, name: 'Riku' },
      { id: 7, name: 'Shin' },
      { id: 8, name: 'Emi' },
      { id: 9, name: 'Daniel' },
      { id: 10, name: 'Mark' },
    ];
    return { members };
  }

  genId(members: Member[]): number {
    return members.length > 0
      ? Math.max(...members.map((member) => member.id)) + 1
      : 11;
  }
}
