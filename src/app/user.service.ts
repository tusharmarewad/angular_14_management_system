
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private key = 'users';

  getUsers() {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  saveUsers(users: any[]) {
    localStorage.setItem(this.key, JSON.stringify(users));
  }

  deleteUser(index: number) {
    const users = this.getUsers();
    users.splice(index, 1);
    this.saveUsers(users);
  }

  updateUser(index: number, updatedUser: any) {
    const users = this.getUsers();
    users[index] = updatedUser;
    this.saveUsers(users);
  }
}
