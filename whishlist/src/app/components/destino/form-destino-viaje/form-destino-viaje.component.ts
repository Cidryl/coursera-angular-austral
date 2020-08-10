import { Component, OnInit, Output, EventEmitter, Inject, forwardRef } from '@angular/core';
import { DestinoViaje } from 'src/app/models/destino-viaje.model';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { APP_CONFIG, AppConfig } from 'src/app/app.module';

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html'
})
export class FormDestinoViajeComponent implements OnInit {
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  fg: FormGroup;
  minLongitud = 5;
  searchResults: string[];

  /**
   * constructor
   * @param fb FormBuilder
   * @para config AppConfig
   */
  constructor(
    private fb: FormBuilder,
    @Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig
    /* Evita la referencia circular entre destino-viaje y app.module */
  ) {
    this.onItemAdded = new EventEmitter();
    this.fg = fb.group({
      nombre: ['', Validators.compose([
        Validators.required,
        // this.nombreValidator
        this.nombreValidatorParametrizable(this.minLongitud)
      ])],
      url: ['']
    });

    this.fb.control('nombre').valueChanges.subscribe(n => {
      console.log('nombre:', n);
    });

    this.fb.control('url').valueChanges.subscribe(u => {
      console.log('url:', u);
    });
  }

  /**
   * Carga inicial
   */
  ngOnInit(): void {
    const elemNombre = document.getElementById('nombre') as HTMLInputElement;

    fromEvent(elemNombre, 'input')
      .pipe(
        map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
        filter(text => text.length > 2),
        debounceTime(200), // 2 decimas de segundo
        distinctUntilChanged(),
        // switchMap(() => ajax('/assets/datos.json'))
        switchMap((text: string) => ajax(`${this.config.apiEndpoint}/ciudades?q=${text}`))
      ).subscribe(ajaxResponse => this.searchResults = ajaxResponse.response);
  }

  /**
   * Guardar destino
   * @param nombre string
   * @param url string
   * @returns boolean
   */
  guardar(nombre: string, url: string): boolean {
    const d = new DestinoViaje(nombre, url);
    this.onItemAdded.emit(d);

    return false;
  }

  nombreValidator(control: FormControl): { [s: string]: boolean } {
    const l = control.value.toString().trim().length;

    if (l > 0 && l < this.minLongitud) {
      return { invalidNombre: true };
    }

    return null;
  }

  nombreValidatorParametrizable(minLong: number): ValidatorFn {
    return (control: FormControl): { [s: string]: boolean } | null => {
      const l = control.value.toString().trim().length;

      if (l > 0 && l < minLong) {
        return { minLongNombre: true };
      }

      return null;
    };
  }
}
