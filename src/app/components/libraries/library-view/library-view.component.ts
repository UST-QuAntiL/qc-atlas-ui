import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { LibrariesService } from 'api-library/services/libraries.service';
import { SelectionModel } from '@angular/cdk/collections';
import { NewLibraryDto } from 'api-library/models';
import {
  QcAtlasUiConfiguration,
  QcAtlasUiRepositoryConfigurationService,
} from '../../../directives/qc-atlas-ui-repository-configuration.service';
import { UtilService } from '../../../util/util.service';
import { AddLibraryDialogComponent } from '../dialogs/add-library-dialog/add-library-dialog.component';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../generics/dialogs/confirm-dialog.component';
import { LibraryTableComponent } from '../library-table/library-table.component';

@Component({
  selector: 'app-library-view',
  templateUrl: './library-view.component.html',
  styleUrls: ['./library-view.component.scss'],
})
export class LibraryViewComponent implements OnInit, AfterViewInit {
  @Input() addIcon = 'playlist_add';
  @Input() emptyTableMessage = 'No elements found';
  @ViewChild(LibraryTableComponent)
  libraryTable!: LibraryTableComponent;
  selection = new SelectionModel<any>(true, []);
  libraries$: string[];
  library: string;
  librariesExist = false;
  uiConfig: QcAtlasUiConfiguration;

  constructor(
    private libraryService: LibrariesService,
    private configService: QcAtlasUiRepositoryConfigurationService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.uiConfig = this.configService.configuration;
  }

  ngAfterViewInit(): void {
    this.getLibraryNames();
  }

  getLibraryNames(): void {
    this.libraryService.getLibraryNames().subscribe((libraries) => {
      this.libraries$ = libraries ?? [];
      if (this.libraries$.length > 0) {
        this.libraries$ = this.libraries$.map((lib) =>
          lib.substr(0, lib.length - 4)
        );
        this.library = this.libraries$[0];
        this.libraryTable.getLibrary(this.library);
        this.librariesExist = true;
      } else {
        this.librariesExist = false;
      }
    });
  }

  onAddLibrary(): void {
    this.utilService
      .createDialog(AddLibraryDialogComponent, {
        title: 'Create new library',
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        const libraryDTO: NewLibraryDto = { libraryName: dialogResult.name };
        this.libraryService.createNewLibrary({ body: libraryDTO }).subscribe(
          () => {
            this.libraryService.getLibraryNames().subscribe((libraries) => {
              this.libraries$ = libraries ?? [];
              this.libraries$ = this.libraries$.map((lib) =>
                lib.substr(0, lib.length - 4)
              );
              this.library = dialogResult.name;
              this.librariesExist = true;
              this.libraryTable.getLibrary(this.library);
            });
            this.utilService.callSnackBar(
              'Successfully added the library "' + this.library + '".'
            );
          },
          () => {
            this.utilService.callSnackBar(
              'Error! Library "' + this.library + '" could not be created.'
            );
          }
        );
      });
  }

  onDeleteLibrary(): void {
    const dialogData: ConfirmDialogData = {
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this library?',
      yesButtonText: 'yes',
      noButtonText: 'no',
    };
    this.utilService
      .createDialog(ConfirmDialogComponent, dialogData)
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          this.libraryService
            .deleteLibrary({ libraryName: this.library })
            .subscribe(
              () => {
                this.getLibraryNames();
                this.utilService.callSnackBar(
                  'Successfully deleted the library "' + this.library + '".'
                );
              },
              () => {
                this.utilService.callSnackBar(
                  'Error! Library "' + this.library + '" could not be deleted.'
                );
              }
            );
        }
      });
  }

  changeLibrary(library: string): void {
    this.libraryTable.getLibrary(library);
    this.library = library;
  }
}
