import { computed, Injectable, signal } from "@angular/core";
import { UI_STRINGS } from "../utils/ui-strings";

@Injectable({ providedIn: 'root' })
export class LocaleService {
  // Signal to store where we have the current languaje
  private _locale = signal<'es' | 'en'>('es');
  
  // The variable to read the current languaje, it is umnmutable from outside
  readonly currentLocale = this._locale.asReadonly();
 
  //Object containing texts in different languajes, seoector (Languaje, field_key)
  private readonly _strings = UI_STRINGS;

  // 4. LA MAGIA: Un Signal computado que cambia SOLO cuando cambia el locale
  readonly labels = computed(() => this._strings[this._locale()]);

  // 5. El método para cambiarlo desde cualquier lado (ej: un botón en el Navbar)
  setLocale(lang: 'es' | 'en') {
    this._locale.set(lang);
  }
}