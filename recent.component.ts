import { Component, OnInit } from '@angular/core';
import { MenuStateService } from './menu-state.service';
import { REQUEST_INITIAL_DATA } from './menu.actions';

@Component({
  selector: 'app-recent',
  template: \`
    <div *ngFor="let item of recent$ | async" class="menu-item">
      {{ item.label }}
      <span [appToggleFavorite]="item">
        {{ item.isFavorite ? '★' : '☆' }}
      </span>
    </div>
  \`
})
export class RecentComponent implements OnInit {
  recent$ = this.menuState.recentWithFavorite$;

  constructor(private menuState: MenuStateService) {}

  ngOnInit() {
    if (!this.menuState.hasInitialData()) {
      this.menuState.dispatch({ type: REQUEST_INITIAL_DATA });
    }
  }
}