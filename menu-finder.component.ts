import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-finder',
  template: \`
    <app-recent></app-recent>
    <app-favorite></app-favorite>
  \`
})
export class MenuFinderComponent {}