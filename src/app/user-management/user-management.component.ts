import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  userForm: FormGroup;
  users: User[] = [];
  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];
  dataSource: MatTableDataSource<User>;
  sortBy: string = ''; // Holds the selected filter
  sortOrder: string = 'asc'; // Holds the selected sort order (asc/desc)

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });

    this.dataSource = new MatTableDataSource<User>();
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadUsers() {
    const usersFromStorage = localStorage.getItem('users');
    this.users = usersFromStorage ? JSON.parse(usersFromStorage) : [];
    this.dataSource.data = this.users;
  }

  saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users));
    this.dataSource.data = this.users; // Update table data
  }

  addUser() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;

      if (formData.id) {
        // Update existing user
        const index = this.users.findIndex((u) => u.id === formData.id);
        if (index !== -1) {
          this.users[index] = { ...formData };
        }
      } else {
        // Add new user
        const newUser: User = {
          id: new Date().getTime(),
          name: formData.name,
          email: formData.email,
          role: formData.role,
        };
        this.users.push(newUser);
      }

      this.saveUsers();
      this.userForm.reset();
      this.userForm.removeControl('id'); // Remove the ID field after saving
    }
  }

  editUser(user: User) {
    // Populate the form with the selected user's data
    this.userForm.patchValue(user);

    // Add the user's ID to the form for updating
    this.userForm.addControl('id', this.fb.control(user.id));
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.users = this.users.filter((user) => user.id !== userId);
      this.saveUsers();
    }
  }

  changeUserRole(user: User, newRole: string) {
    const userIndex = this.users.findIndex((u) => u.id === user.id);
    if (userIndex !== -1) {
      this.users[userIndex].role = newRole;
      this.saveUsers();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortUsers() {
    if (this.sortBy === 'name') {
      this.users.sort((a, b) => {
        return this.sortOrder === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      });
    } else if (this.sortBy === 'email') {
      this.users.sort((a, b) => {
        return this.sortOrder === 'asc'
          ? a.email.localeCompare(b.email)
          : b.email.localeCompare(a.email);
      });
    }
    this.saveUsers(); // Persist sorted data
  }

  changeSortOrder(order: string) {
    this.sortOrder = order;
    this.sortUsers();
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.addUser();
    }
  }
}