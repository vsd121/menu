import { Component, OnInit } from '@angular/core';
import { MenuStateService } from './menu-state.service';
import { REQUEST_INITIAL_DATA } from './menu.actions';

@Component({
  selector: 'app-favorite',
  template: \`
    <div *ngFor="let item of favorites$ | async" class="menu-item">
      {{ item.label }}
      <span [appToggleFavorite]="item">★</span>
    </div>
  \`
})
export class FavoriteComponent implements OnInit {
  favorites$ = this.menuState.favoriteItems$;

  constructor(private menuState: MenuStateService) {}

  ngOnInit() {
    if (!this.menuState.hasInitialData()) {
      this.menuState.dispatch({ type: REQUEST_INITIAL_DATA });
    }
  }
}