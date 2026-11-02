import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private router = inject(Router);
  private location = inject(Location);

  gotoLogin() {
    this.router.navigate(['/login']);
  }

  gotoContact() {
    this.router.navigate(['/contact']);
  }

  goBack() {
    this.location.back();
  }
}
