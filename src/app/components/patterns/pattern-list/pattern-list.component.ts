import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatternService } from 'api-atlas/services/pattern.service';
import { PatternDto } from 'api-atlas/models/pattern-dto';
import {
  QueryParams,
  UrlData,
} from '../../generics/data-list/data-list.component';
import { UtilService } from '../../../util/util.service';
import { PaginatorConfig } from '../../../util/paginatorConfig';
import { PagingInfo } from '../../../util/PagingInfo';

@Component({
  selector: 'app-pattern-list',
  templateUrl: './pattern-list.component.html',
  styleUrls: ['./pattern-list.component.scss'],
})
export class PatternListComponent implements OnInit {
  patterns: PatternDto[] = [];
  tableColumns = ['Pattern', 'URL', 'Pattern Language'];
  variableNames = ['name', 'url', 'patternLanguageName'];
  externalLinkVariables = ['url'];
  pagingInfo: PagingInfo<PatternDto> = {};
  paginatorConfig: PaginatorConfig = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };

  constructor(
    private patternService: PatternService,
    private router: Router,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {}

  getPatterns(params: QueryParams): void {
    this.patternService.getPatterns(params).subscribe(
      (data) => {
        // console.log('API response:', data);
        this.preparePatternData(data);
      },
      () => {
        this.utilService.callSnackBar(
          'Error! Patterns types could not be retrieved.'
        );
      }
    );
    console.log('getPatterns called');
  }

  preparePatternData(data): void {
    // Read all incoming data
    if (data._embedded.patternModels) {
      this.patterns = data._embedded.patternModels.map((pattern) => {
        // Concatenate the URL
        pattern.url = `http://localhost:1978/pattern-languages/${pattern.patternLanguageId}/${pattern.id}`;
        return pattern;
      });
    } else {
      this.patterns = [];
    }

    this.pagingInfo.totalPages = data.totalPages;
    this.pagingInfo.number = data.number;
    this.pagingInfo.sort = data.sort;
  }

  onElementClicked(pattern: PatternDto): void {
    this.router.navigate(['patterns', pattern.id]);
  }

  onUrlClicked(urlData: UrlData): void {
    // No check needed since patterns have only one url-field called 'url'
    window.open(urlData.element['url'], '_blank');
  }
}
