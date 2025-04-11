import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { MenuItem } from './menu-item.model';
import { SET_INITIAL_DATA, TOGGLE_FAVORITE, REQUEST_INITIAL_DATA } from './menu.actions';

@Injectable({ providedIn: 'root' })
export class MenuStateService {
  private recentItemsSubject = new BehaviorSubject<MenuItem[]>([]);
  private favoriteItemsSubject = new BehaviorSubject<MenuItem[]>([]);
  private action$ = new Subject<{ type: string; payload?: any }>();
  private favoriteChangedSubject = new Subject<MenuItem[]>();
  private requestInitialDataSubject = new Subject<void>();
  private requestedInitialData = false;

  readonly recentWithFavorite$ = this.recentItemsSubject.pipe(
    map(recent =>
      recent.map(item => ({
        ...item,
        isFavorite: this.favoriteItemsSubject.getValue().some(f => f.id === item.id),
      }))
    )
  );

  readonly favoriteItems$ = this.favoriteItemsSubject.asObservable();
  readonly favoriteChanged$ = this.favoriteChangedSubject.asObservable();
  readonly requestInitialData$ = this.requestInitialDataSubject.asObservable();

  constructor() {
    this.registerEffects();
  }

  dispatch(action: { type: string; payload?: any }) {
    if (action.type === REQUEST_INITIAL_DATA && this.requestedInitialData) return;
    if (action.type === REQUEST_INITIAL_DATA) {
      this.requestedInitialData = true;
    }

    this.action$.next(action);
    this.reduce(action);
  }

  private reduce(action: { type: string; payload?: any }) {
    switch (action.type) {
      case SET_INITIAL_DATA:
        this.recentItemsSubject.next(action.payload.recent);
        this.favoriteItemsSubject.next(action.payload.favorite);
        break;

      case TOGGLE_FAVORITE:
        const item = action.payload;
        const current = this.favoriteItemsSubject.getValue();
        const exists = current.some(i => i.id === item.id);
        const updated = exists
          ? current.filter(i => i.id !== item.id)
          : [...current, item];
        this.favoriteItemsSubject.next(updated);
        break;

      case REQUEST_INITIAL_DATA:
        this.requestInitialDataSubject.next();
        break;
    }
  }

  private registerEffects() {
    this.action$
      .pipe(
        filter(action => action.type === TOGGLE_FAVORITE),
        tap(() => {
          const favs = this.favoriteItemsSubject.getValue();
          this.favoriteChangedSubject.next(favs);
        })
      )
      .subscribe();
  }

  hasInitialData(): boolean {
    return (
      this.recentItemsSubject.getValue().length > 0 ||
      this.favoriteItemsSubject.getValue().length > 0
    );
  }
}