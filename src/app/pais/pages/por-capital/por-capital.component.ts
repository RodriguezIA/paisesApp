import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';


@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent implements OnInit {

  title: string = 'Por Capital';
  termino: string = '';
  hayError: boolean = false;
  paises:Country[] = [];


  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
  }

  buscar(termino: string) {

    this.termino = termino;
    this.hayError = false;
    console.log(this.termino)

    this.paisService.buscarCapital(this.termino)
      .subscribe(paises => {
        this.paises = paises
        console.log(this.paises);
      }, (err) => {
        this.hayError = true;
        console.info(err);
        this.paises = [];
      });
  }

  sugerencias(termino: string) {
    this.hayError = false;
  }

}
