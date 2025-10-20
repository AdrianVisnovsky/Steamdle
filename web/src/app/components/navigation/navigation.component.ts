import { Component } from '@angular/core';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css'],
    standalone: false
})
export class NavigationComponent {

  public mobileMenuExpanded: boolean = false;

  public toggleMobileMenu(): void {
    this.mobileMenuExpanded = !this.mobileMenuExpanded;
  }

}
