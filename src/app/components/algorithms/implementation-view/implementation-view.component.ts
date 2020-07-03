import { Component, OnInit } from '@angular/core';
import { AlgorithmService } from 'api/services/algorithm.service';
import { ActivatedRoute } from '@angular/router';
import { Implementation } from 'api/models/implementation';

@Component({
  templateUrl: './implementation-view.component.html',
  styleUrls: ['./implementation-view.component.scss']
})
export class ImplementationViewComponent implements OnInit {

  impl: Implementation;
  algo: Algorithm;

  tabOptions = ["Test1", "Test2", "Test2","Test2"];

  constructor(private algorithmService: AlgorithmService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const algoId = params['algo_id'];
      const implId = params['impl_id'];

      this.algorithmService.getAlgorithm({algoId: algoId}).subscribe(next => {
        // TODO is this cast needed? seems wrong
        this.algo = next as Algorithm;
      });

      this.algorithmService.getImplementation({ algoId: algoId, implId: implId }).subscribe(next => {
        // TODO is this cast needed? seems wrong
        this.impl = next as Implementation;
      });
    });
  }
}
