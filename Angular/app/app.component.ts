import { Component } from '@angular/core';
import { asEnumerable } from 'linq-es2015';

@Component({
    selector: 'my-app',
    template: '<h1>My First Angular 2 App with LINQ</h1><div>Count - {{Count}}</div>'
})
export class AppComponent { 
    Count: number;

    constructor(){
        this.Count = asEnumerable([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).Where(a => a % 2 == 1)
			                                                      .Count();        
    }
}
