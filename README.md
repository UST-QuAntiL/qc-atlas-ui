# QC Atlas UI

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

User Interface for the QuAntiL Environment supporting
 - [QC Atlas](https://github.com/UST-QuAntiL/qc-atlas)
 - [LaTeX Renderer](https://github.com/UST-QuAntiL/latex-renderer)
 - [NISQ Analyzer](https://github.com/UST-QuAntiL/nisq-analyzer)
 - [Pattern Atlas](https://github.com/PatternAtlas/pattern-atlas-api)
 - [QProv](https://github.com/UST-QuAntiL/qprov)

A detailed user guide and documentation can be found [here](https://quantil.readthedocs.io/en/latest/).

For running the UI with all its backend components, visit [quantil-docker](https://github.com/UST-QuAntiL/quantil-docker).

The UI was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to <http://localhost:4200>. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## OpenAPI Code Generation

To update all files generated by the OpenAPI code generation, run `npm run gen-[atlas|patternpedia|nisq|latex|qprov]` (for example: `npm run gen-atlas` to generate the code for the QC-Atlas Backend) or use `npm run gen` to generate the code for all backends. 
Please make sure to run `npm run postgen` to reformat the files before commiting them. 
 
## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Acknowledgements

Current development is supported by the [Federal Ministry for Economic Affairs and Energy] as part of the [PlanQK] project (01MK20005N) and the DFG’s Excellence Initiative project [SimTech] (EXC 2075 - 390740016).

## Haftungsausschluss

Dies ist ein Forschungsprototyp.
Die Haftung für entgangenen Gewinn, Produktionsausfall, Betriebsunterbrechung, entgangene Nutzungen, Verlust von Daten und Informationen, Finanzierungsaufwendungen sowie sonstige Vermögens- und Folgeschäden ist, außer in Fällen von grober Fahrlässigkeit, Vorsatz und Personenschäden, ausgeschlossen.

## Disclaimer of Warranty

Unless required by applicable law or agreed to in writing, Licensor provides the Work (and each Contributor provides its Contributions) on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied, including, without limitation, any warranties or conditions of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A PARTICULAR PURPOSE.
You are solely responsible for determining the appropriateness of using or redistributing the Work and assume any risks associated with Your exercise of permissions under this License.

## License

SPDX-License-Identifier: Apache-2.0

  [Federal Ministry for Economic Affairs and Energy]: http://www.bmwi.de/EN
  [PlanQK]: https://planqk.de
  [SimTech]: https://www.simtech.uni-stuttgart.de/
