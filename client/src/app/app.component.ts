import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public title = 'Application';

  constructor(private router: Router, private spinner: SpinnerService) {}
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.spinner.show();
        setTimeout(() => {
          this.spinner.hide();
        }, 3000);
      }
    });
  }
}
