import { Component, Input, OnInit } from '@angular/core';
import { AlgorithmDto } from 'api/models/algorithm-dto';

@Component({
  selector: 'app-algorithm-related-patterns',
  templateUrl: './algorithm-related-patterns.component.html',
  styleUrls: ['./algorithm-related-patterns.component.scss'],
})
export class AlgorithmRelatedPatternsComponent implements OnInit {
  @Input() algorithm: AlgorithmDto;
  constructor() {}

  ngOnInit(): void {
    console.log(this.algorithm);
  }
}
