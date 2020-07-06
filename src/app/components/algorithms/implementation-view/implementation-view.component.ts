import { Component, OnInit } from '@angular/core';
import { AlgorithmService } from 'api/services/algorithm.service';
import { ActivatedRoute } from '@angular/router';
import { AlgorithmDto } from 'api/models/algorithm-dto';
import { ImplementationDto } from 'api/models/implementation-dto';
import { SoftwarePlatformDto } from 'api/models/software-platform-dto';
import { SoftwarePlatformService } from 'api/services/software-platform.service';
import { BreadcrumbLink } from '../../generics/navigation-breadcrumb/navigation-breadcrumb.component';
import { Option } from '../../generics/property-input/select-input.component';

@Component({
  templateUrl: './implementation-view.component.html',
  styleUrls: ['./implementation-view.component.scss'],
})
export class ImplementationViewComponent implements OnInit {
  impl: ImplementationDto;
  algo: AlgorithmDto;
  softwarePlatformOptions: Option[];

  links: BreadcrumbLink[] = [
    { heading: '', subHeading: '' },
    { heading: '', subHeading: '' },
  ];

  constructor(
    private algorithmService: AlgorithmService,
    private softwarePlatformService: SoftwarePlatformService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.softwarePlatformService.getSoftwarePlatforms1().subscribe((list) => {
      const softwarePlatforms = list._embedded?.softwarePlatforms || [];
      this.softwarePlatformOptions = softwarePlatforms.map((sp) => ({
        label: sp.name,
        value: sp.id,
      }));
    });
    this.activatedRoute.params.subscribe(({ algoId, implId }) => {
      this.algorithmService.getAlgorithm({ algoId }).subscribe((algo) => {
        this.algo = algo;
        this.links[0] = {
          heading: this.algo.name,
          subHeading: this.algo.computationModel + ' Algorithm',
        };
      });

      this.algorithmService
        .getImplementation({ algoId, implId })
        .subscribe((impl) => {
          this.impl = impl;
          this.links[1] = {
            heading: this.impl.name,
            subHeading: '',
          };
        });
    });
  }

  onChange(): void {
    this.algorithmService
      .updateImplementation({
        algoId: this.algo.id,
        implId: this.impl.id,
        body: this.impl,
      })
      .subscribe();
    // live refresh name
    this.links[1] = {
      heading: this.impl.name,
      subHeading: '',
    };
  }
}
