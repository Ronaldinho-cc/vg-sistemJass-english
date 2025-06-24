import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/components/layout/header/header.component';
import { SidebarComponent } from '../../shared/components/layout/sidebar/sidebar.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SidebarComponent
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isSidebarOpen: boolean = true;
  showMobileMenuButton: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.checkScreenSize();
    // Recuperar el estado de la sidebar del localStorage
    const savedState = localStorage.getItem('sidebarState');
    if (savedState !== null) {
      this.isSidebarOpen = JSON.parse(savedState);
    } else {
      // Si no hay estado guardado, inicializar basado en el tamaño de la pantalla
      this.isSidebarOpen = window.innerWidth >= 768;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    // Auto-close sidebar on mobile screens
    if (window.innerWidth < 768) {
      this.showMobileMenuButton = true;
    } else {
      this.showMobileMenuButton = false;
      this.isSidebarOpen = true;
    }
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    localStorage.setItem('sidebarState', JSON.stringify(this.isSidebarOpen));
  }
}
