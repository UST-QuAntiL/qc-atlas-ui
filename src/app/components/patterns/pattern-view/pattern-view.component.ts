import { Component, OnInit } from '@angular/core';
import { PatternService } from 'api-atlas/services/pattern.service';
import { PatternDto } from 'api-atlas/models/pattern-dto';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BreadcrumbLink } from '../../generics/navigation-breadcrumb/navigation-breadcrumb.component';
import { ChangePageGuard } from '../../../services/deactivation-guard';
import { UtilService } from '../../../util/util.service';

@Component({
  selector: 'app-pattern-view',
  templateUrl: './pattern-view.component.html',
  styleUrls: ['./pattern-view.component.scss'],
})
export class PatternViewComponent implements OnInit {
  testTags: string[] = ['test tag', 'quantum', 'pattern'];
  pattern: PatternDto;
  frontendPattern: PatternDto;
  links: BreadcrumbLink[] = [{ heading: '', subHeading: '' }];
  private routeSub: Subscription;

  constructor(
    private patternService: PatternService,
    private route: ActivatedRoute,
    private utilService: UtilService,
    public guard: ChangePageGuard
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(({ patternId }) => {
      this.patternService.getPattern({ patternId }).subscribe(
        (pattern: PatternDto) => {
          this.pattern = pattern;
          this.frontendPattern = JSON.parse(
            JSON.stringify(pattern)
          ) as PatternDto;
          this.links[0] = {
            heading: this.pattern.name,
            subHeading: '',
          };
        },
        () => {
          this.utilService.callSnackBar(
            'Error! Patterns could not be retrieved.'
          );
        }
      );
    });
  }
}
