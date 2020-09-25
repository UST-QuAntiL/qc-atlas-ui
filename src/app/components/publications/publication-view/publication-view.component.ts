import { Component, OnInit } from '@angular/core';
import { PublicationService } from 'api-atlas/services/publication.service';
import { EntityModelPublicationDto } from 'api-atlas/models/entity-model-publication-dto';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EntityModelAlgorithmDto } from 'api-atlas/models/entity-model-algorithm-dto';
import { BreadcrumbLink } from '../../generics/navigation-breadcrumb/navigation-breadcrumb.component';
import { UtilService } from '../../../util/util.service';

@Component({
  selector: 'app-publication-view',
  templateUrl: './publication-view.component.html',
  styleUrls: ['./publication-view.component.scss'],
})
export class PublicationViewComponent implements OnInit {
  testTags: string[] = ['test tag', 'quantum', 'publication'];
  publication: EntityModelPublicationDto;
  frontendPublication: EntityModelPublicationDto;
  links: BreadcrumbLink[] = [{ heading: '', subHeading: '' }];
  private routeSub: Subscription;

  constructor(
    private publicationService: PublicationService,
    private route: ActivatedRoute,
    public utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(({ publicationId }) => {
      this.publicationService.getPublication({ id: publicationId }).subscribe(
        (publication: EntityModelPublicationDto) => {
          this.publication = publication;
          this.frontendPublication = JSON.parse(
            JSON.stringify(publication)
          ) as EntityModelPublicationDto;
          this.links[0] = {
            heading: this.publication.title,
            subHeading: '',
          };
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  savePublication(): void {
    this.publicationService
      .updatePublication({
        id: this.publication.id,
        body: this.frontendPublication,
      })
      .subscribe((publication) => {
        this.publication = publication;
        this.frontendPublication = JSON.parse(
          JSON.stringify(publication)
        ) as EntityModelPublicationDto;
      });
  }
  addTag(): void {
    console.log('add tag');
    // TODO: create tag dialog
  }

  removeTag(tag: string): void {
    const index = this.testTags.indexOf(tag);
    if (index !== -1) {
      this.testTags.splice(index, 1);
    }
  }

  updatePublicationField(event: { field; value }): void {
    this.publication[event.field] = event.value;
    this.publicationService
      .updatePublication({ id: this.publication.id, body: this.publication })
      .subscribe(
        (publication) => {
          this.publication = publication;
          this.utilService.callSnackBar('Successfully updated publication');
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
