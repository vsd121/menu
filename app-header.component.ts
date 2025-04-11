import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: \`
    <div class="header">
      <span class="menu-trigger">☰</span>
      <div class="dropdown-overlay">
        <app-menu-finder></app-menu-finder>
      </div>
    </div>
  \`
})
export class AppHeaderComponent {}