import { Component, OnInit } from '@angular/core';
import { ICar } from '../../models/car';
import { Observable } from 'rxjs';
import { CarService } from '../../services/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CarDataService } from '../../services/car-data.service';

@Component({
  selector: 'app-index-cars',
  templateUrl: './index-cars.component.html',
  styleUrls: ['./index-cars.component.scss']
})
export class IndexCarsComponent implements OnInit {

  cars$!: ICar[];
  hide:boolean = false;
  brands: { [brand: string]: number } = {};
  total!: number;

  constructor(private carService: CarService, private router: Router, private carData: CarDataService) { 
  }

  ngOnInit(): void {
    this.carService.getCars().subscribe(res => {
      this.cars$ = res;
      console.log(res);
    });
    const car = this.carData.getCar();
    if (car)
      this.cars$.push(car);
    this.carData.clearCar();
  }

  showCar(car: ICar) {
    this.router.navigate([`/cars/${car.idCar}`]);
  }
  deleteCar(car: ICar) {
    this.carService.deleteCar(car.idCar).subscribe(
      res => {
        console.log(car.idCar);
        const carIndex = this.cars$.indexOf(car);
        this.cars$.splice(carIndex, 1);
      }
    )
  }

  // receiveCar(car: ICar) {
  //   this.carService.createCar(car).subscribe(
  //     res => this.cars$.push(res),
  //   );
  // }

  createCar() {
    //this will be replaced by form angular forms
    this.router.navigate([`/cars/add-form`]);
  }

  editCar(car: ICar) {
    this.carData.setCar(car);
    this.router.navigate(['/cars/add-form']);
  }
  calculateBrands() {
    var sum = 0;
    this.hide=true;
    for (var i = 0; i < this.cars$.length; i++)
      if (this.brands[this.cars$[i].brand.trim()])
        this.brands[this.cars$[i].brand.trim()]++;
      else
        this.brands[this.cars$[i].brand.trim()] = 1;
    for (const brand in this.brands) {
      sum = sum + this.brands[brand.trim()];
      console.log(sum);
    }
    console.log(this.brands);
    this.total = sum;
  }


}
