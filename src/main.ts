import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

function initializeTheme() {
  document.documentElement.classList.toggle(
    "dark",
    localStorage.getItem('theme') === "dark" ||
      (!localStorage.getItem('theme') && window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'light');
    document.documentElement.classList.remove('dark');
  }
}

initializeTheme();

// Agregar provideAnimations al config
const enhancedAppConfig = {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideAnimations(),
    provideHttpClient()
  ]
};

bootstrapApplication(AppComponent, enhancedAppConfig)
  .catch((err) => console.error(err));
