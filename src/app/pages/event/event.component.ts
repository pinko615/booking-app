import { Component } from '@angular/core';
import { SessionsListCardComponent } from '../../components/sessions-list-card/sessions-list-card.component';
import { CartComponent } from '../../components/cart/cart.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [SessionsListCardComponent, CartComponent],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent {

  constructor(private router: Router) { }

  goBack(): void {
    this.router.navigate(['/']);
  }

}
