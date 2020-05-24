# OpenAPI 

## What is OpenAPI?
[OpenAPI](https://swagger.io/specification/) is used in the [qc-atlas project](https://github.com/PlanQK/qc-atlas). It enables developers to generate client stubs to communicate with the backend.
In this case angular services and models are generated automatically. 

## How do i generate services?
Launch the [qc-atlas server](https://github.com/PlanQK/qc-atlas) and run `npm run gen`. Generated files are located in the `generated/` folder and should be committed.