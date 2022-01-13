import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [`
    button {
      margin-right: 12px;
    }
  `
  ]
})
export class PorRegionComponent {

  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva: string = '';
  paises: Country[] = [];
  error: boolean = false;

  constructor(private paisService: PaisService) { }

  getClaseCSS(region: string): string {
    return (region === this.regionActiva) ? 'btn btn-primary' : 'btn btn-outline-primary';
  }

  activarRegion (region: string) {

    this.regionActiva = region,
    
    // TODO: hacer la peticion del servicio HTTP
    this.paisService.buscarRegion(region).subscribe(paises => {
      this.paises = paises;
      console.log(this.paises.length)
    }, (err) =>{
      this.error = true;
      console.info(err);
      this.paises = [];
    });
  }

}
