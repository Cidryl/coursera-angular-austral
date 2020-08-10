import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'whishlist';
  time = new Observable(observer => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });

  constructor(
    public translate: TranslateService
  ) {
    console.log('************ get translation');
    translate.getTranslation('en').subscribe(x => console.log('x: ' + JSON.stringify(x)));
    translate.setDefaultLang('es');
  }
}
