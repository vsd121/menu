import { Directive, HostListener, Input } from '@angular/core';
import { MenuItem } from './menu-item.model';
import { MenuStateService } from './menu-state.service';
import { TOGGLE_FAVORITE } from './menu.actions';

@Directive({
  selector: '[appToggleFavorite]'
})
export class ToggleFavoriteDirective {
  @Input('appToggleFavorite') item!: MenuItem;

  constructor(private state: MenuStateService) {}

  @HostListener('click')
  onClick() {
    this.state.dispatch({ type: TOGGLE_FAVORITE, payload: this.item });
  }
}