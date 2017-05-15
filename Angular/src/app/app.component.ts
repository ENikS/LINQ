import { Component } from '@angular/core';
import { asEnumerable } from 'linq-es2015';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app works!';
  count: number;

    constructor(){
      this.count = asEnumerable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).Where(a => a % 2 == 1)
			                                                          .Count();        
    }
}
