# OpenAPI 

## What is OpenAPI?
[OpenAPI](https://swagger.io/specification/) is used in the [qc-atlas project](https://github.com/PlanQK/qc-atlas). It enables developers to generate client stubs to communicate with the backend.
In this case angular services and models are generated automatically. 

## How do i generate services?
The custom scripts to generate the various services are defined in the `package.json` file and can be executed with `npm run <script name>`.
Therefore, it is necessary to run the backend providing the OpenAPI specification before running the scripts.
Generated files are located in the `generated/` folder and should be committed after formatting them using prettier.

#### Generate qc-atlas services
- Launch the [qc-atlas server](https://github.com/PlanQK/qc-atlas) 
- Run `npm run gen-atlas` to generate the qc atlas services. 
- Run `npm run postgen` to format the files using prettier.


