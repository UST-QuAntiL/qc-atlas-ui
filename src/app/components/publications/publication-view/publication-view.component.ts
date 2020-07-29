import { Component, OnInit } from '@angular/core';
import { PublicationService } from 'api/services/publication.service';
import { EntityModelPublicationDto } from 'api/models/entity-model-publication-dto';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BreadcrumbLink } from '../../generics/navigation-breadcrumb/navigation-breadcrumb.component';

@Component({
  selector: 'app-publication-view',
  templateUrl: './publication-view.component.html',
  styleUrls: ['./publication-view.component.scss'],
})
export class PublicationViewComponent implements OnInit {
  testTags: string[] = ['test tag', 'quantum', 'publication'];
  publication: EntityModelPublicationDto;
  links: BreadcrumbLink[] = [{ heading: '', subHeading: '' }];
  private routeSub: Subscription;

  constructor(
    private publicationService: PublicationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(({ publicationId }) => {
      this.publicationService.getPublication({ id: publicationId }).subscribe(
        (publication: EntityModelPublicationDto) => {
          this.publication = publication;
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
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
