import { Component, Input, OnInit } from '@angular/core';
import { EntityModelPublicationDto } from 'api/models/entity-model-publication-dto';
import { GenericDataService } from '../../../util/generic-data.service';

@Component({
  selector: 'app-publication-algorithms-list',
  templateUrl: './publication-algorithms-list.component.html',
  styleUrls: ['./publication-algorithms-list.component.scss'],
})
export class PublicationAlgorithmsListComponent implements OnInit {
  @Input() publication: EntityModelPublicationDto;
  showRelatedAlgoTable = true;
  addIcon = 'playlist_add';
  addSubmitSelectionIcon = '';
  algorithms: any[] = [];
  tableColumns = ['Name', 'Acronym', 'Type', 'Problem'];
  variableNames = ['name', 'acronym', 'computationModel', 'problem'];
  pagingInfo: any = {};
  paginatorConfig: any = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };

  constructor(private genericDataService: GenericDataService) {}

  ngOnInit(): void {
    const links = JSON.parse(JSON.stringify(this.publication._links));
    this.getPublicationAlgorithms(links.algorithms.href);
  }

  getPublicationAlgorithms(url: string): void {
    this.genericDataService.getData(url).subscribe((data) => {
      this.prepareAlgorithmData(JSON.parse(JSON.stringify(data)));
    });
  }

  prepareAlgorithmData(data): void {
    // Read all incoming data
    if (data._embedded) {
      this.algorithms = data._embedded.algorithms;
    } else {
      this.algorithms = [];
    }
  }

  onElementClicked(algorithm: any): void {
    console.log('Algorithm clicked');
  }

  onAddNewAlgorithms(): void {
    this.showRelatedAlgoTable = false;
  }

  onAddSelectedAlgorithms(event): void {
    this.showRelatedAlgoTable = true;
  }

  onPageChanged(event): void {
    console.log('Page change clicked!');
  }

  onDatalistConfigChanged(event): void {
    console.log('Config change clicked!');
  }
}
