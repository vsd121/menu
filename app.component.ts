import { Component, OnInit } from '@angular/core';
import { MenuStateService } from './menu-state.service';
import { SET_INITIAL_DATA } from './menu.actions';

@Component({
  selector: 'app-root',
  template: \`<app-header></app-header>\`
})
export class AppComponent implements OnInit {
  constructor(private menuState: MenuStateService) {}

  ngOnInit() {
    this.menuState.requestInitialData$.subscribe(() => {
      this.loadInitialMenus();
    });

    this.menuState.favoriteChanged$.subscribe(favs => {
      this.syncFavoritesToBackend(favs);
    });
  }

  loadInitialMenus() {
    const recent = [
      { id: '1', label: 'Dashboard' },
      { id: '2', label: 'Reports' },
      { id: '3', label: 'Settings' }
    ];
    const favorite = [{ id: '2', label: 'Reports' }];

    this.menuState.dispatch({
      type: SET_INITIAL_DATA,
      payload: { recent, favorite }
    });
  }

  syncFavoritesToBackend(favs: any[]) {
    console.log('Syncing favorites to backend:', favs);
    // Replace with real API call
  }
}