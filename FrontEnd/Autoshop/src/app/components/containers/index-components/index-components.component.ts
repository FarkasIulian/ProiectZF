import { Component, OnInit } from '@angular/core';
import { IComponent } from '../../models/component';
import { ComponentService } from '../../services/component.service';
import { Router } from '@angular/router';
import { CompDataService } from '../../services/comp-data.service';

@Component({
  selector: 'app-index-components',
  templateUrl: './index-components.component.html',
  styleUrls: ['./index-components.component.scss']
})
export class IndexComponentsComponent implements OnInit {
  components$!: IComponent[];
  minPrice!: number;

  constructor(private componentService: ComponentService, private router: Router, private compData: CompDataService) { }

  ngOnInit(): void {
    this.loadAllComp();
    const comp = this.compData.getComp();
    if (comp)
      this.components$.push(comp);
    this.compData.clearComp();
  }

  showComp(comp: IComponent) {
    this.router.navigate([`/components/${comp.idComponent}`]);
  }

  loadAllComp(){
    this.componentService.getComponents().subscribe(x => {
      this.components$ = x;
      console.log(x);
    })
  }

  deleteComp(comp: IComponent) {
    this.componentService.deleteComponent(comp.idComponent).subscribe(
      res => {
        const compIndex = this.components$.indexOf(comp);
        this.components$.splice(compIndex, 1);
      }
    )
  }

  createComp() {
    this.router.navigate([`/components/add-form`]);
  }

  updateComp(comp: IComponent) {
    this.compData.setComp
      (comp);
    this.router.navigate(['/components/add-form']);
  }

  getTotalValue() {
    var sum = 0;
    this.components$.forEach(comp => {
      sum += comp.price * comp.stock;
    })
    console.log(sum);
    return sum;
  }
  calculateMin() {
    var comps = this.components$;
    if (this.minPrice) {
      comps = this.components$.filter(comp => comp.price > this.minPrice);
    }
    return comps;
  }


}
