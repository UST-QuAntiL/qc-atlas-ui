import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import { ImplementationDto as AtlasImplementationDto } from 'api-atlas/models/implementation-dto';
import { ImplementationService as NISQImplementationService } from 'api-nisq/services/implementation.service';
import { ImplementationDto as NISQImplementationDto } from 'api-nisq/models/implementation-dto';
import { ImplementationListDto as NISQImplementationListDto } from 'api-nisq/models/implementation-list-dto';

@Injectable({
  providedIn: 'root',
})
export class NisqAnalyzerService {
  fixedImplementations = false;
  algorithmId: string;

  constructor(
    private algorithmService: AlgorithmService,
    private nisqImplementationService: NISQImplementationService
  ) {}

  getImplementations(): Observable<NISQImplementationListDto> {
    return this.nisqImplementationService.getImplementations({
      algoId: this.algorithmId,
    });
  }

  /**
   * tries to fix differences between atlas and nisq db
   * this is definitely not ideal
   */
  // TODO these calls might not be finished until other requests are made
  init(algorithmId: string): void {
    this.algorithmId = algorithmId;
    // Look if implementations with same algo id exist in NISQ analyzer db
    // match implementations with NISQ db and Altas db
    const impls$ = this.algorithmService.getImplementations({
      algoId: this.algorithmId,
    });
    const nisqImpls$ = this.nisqImplementationService.getImplementations({
      algoId: this.algorithmId,
    });
    forkJoin([impls$, nisqImpls$]).subscribe((results) => {
      const nisqImplementations = results[1].implementationDtos || [];
      const altasImplementations = results[0]._embedded.implementations || [];
      this.fixNISQIMplementations(altasImplementations, nisqImplementations);
    });
  }

  private fixNISQIMplementations(
    altasImplementations: AtlasImplementationDto[],
    nisqImplementations: NISQImplementationDto[]
  ): void {
    const missingImplsInNISQ: NISQImplementationDto[] = [];
    for (const atlasImpl of altasImplementations) {
      const tmp = nisqImplementations.find((impl) => impl.id === atlasImpl.id);
      if (!tmp) {
        // TODO: input/output params how to parse from atlas? It only saves a string for whatever reason
        missingImplsInNISQ.push({
          id: atlasImpl.id,
          name: atlasImpl.name,
          implementedAlgorithm: this.algorithmId,
          // TODO where do we get those from?
          selectionRule: 'N > 2',
          sdk: 'qiskit',
          fileLocation: '/home/',
        });
      }
    }
    this.addImplementationsToNisq(missingImplsInNISQ).subscribe((_) => {
      this.fixedImplementations = true;
    });
  }

  private addImplementationsToNisq(
    implementations: NISQImplementationDto[]
  ): Observable<NISQImplementationDto[]> {
    // TODO add create multiple implementations at once to NISQ analyzer
    const observables: Array<Observable<NISQImplementationDto>> = [];
    for (const impl of implementations) {
      observables.push(
        this.nisqImplementationService.createImplementation({ body: impl })
      );
    }
    return forkJoin(...observables);
  }
}
