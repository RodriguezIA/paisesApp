import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [`
  li {
    cursor: pointer;
  }

  a{
    text-decoration: none;
  }
  `
  ]
})
export class PorPaisComponent {

  termino : string = '';
  hayError: boolean = false;
  paises  : Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor(private paisService: PaisService) { }

  buscar(termino: string) {

    this.mostrarSugerencias = false;
    this.termino = termino;
    this.hayError = false;
    console.log(this.termino)

    this.paisService.buscarPais(this.termino)
    .subscribe( resp => {
      this.paises = resp
      //console.log(this.paises);
    }, (err) => { 
      this.hayError = true;
      console.info(err);
      this.paises = [];
    });
  }
  

  sugerencias(termino:string) {
    this.termino = termino;
    this.hayError = false;
    this.mostrarSugerencias = true;

    this.paisService.buscarPais(termino)
    .subscribe(paises => {
      this.paisesSugeridos = paises.splice(0,5);
    }, (err) => {
      this.paisesSugeridos = [];
    });

  }

  buscarSugeridos(termino: string){
    this.buscar(termino);
  }

}
