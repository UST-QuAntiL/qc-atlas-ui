import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilService } from '../../../util/util.service';

@Component({
  selector: 'qunicorn-service',
  templateUrl: './qunicorn-service.component.html',
  styleUrls: ['./qunicorn-view.component.scss'],
})
export class QunicornAppComponent implements OnInit {
  tableColumns = ['Name'];
  variableNames = ['name'];
  loading = true;

  userInput = '';
  deploymentID: number = 3;
  deploymentName = 'PlanQK-UseCase';
  jobID: any = 1;
  jobName = 'PlanQK-Job';
  placeholderCircuit: string = 'OPENQASM 2.0;\ninclude "qelib1.inc";\nqreg q[2];\ncreg meas[2];\nh q[0];\ncx q[0],q[1]; \
  \nbarrier q[0],q[1];\nmeasure q[0] -> meas[0];\nmeasure q[1] -> meas[1];\n';

  selectedPlatform = 'IBM'; // Added property for the selected platform
  selectedLanguage = 'QASM2';
  selectedDevice: string;

  response: any;
  jobResponse: any;
  deploymentResponse: any;
  getDeploymentResponse: any;
  deviceResponse: any;
  result: any;
  counts: any;
  probabilities: any;
  resultcounts: any;
  histogramChart: any;

  constructor(
    private router: Router,
    private utilService: UtilService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  getJobs() {
    this.http
      .get('http://localhost:5005/jobs/', {
        headers: { accept: 'application/json' },
      })
      .subscribe(
        (data: any) => {
          this.response = JSON.stringify(data);
        },
        (error: any) => {
          this.response = 'Error occurred while making the request.';
        }
      );
  }

  submitDeployment() {
    const headers = new HttpHeaders()
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json');

    if (this.userInput === '') {
      this.userInput =
        'OPENQASM 2.0;\ninclude "qelib1.inc";\nqreg q[2];\ncreg meas[2];\nh q[0];\ncx q[0],q[1]; \
        \nbarrier q[0],q[1];\nmeasure q[0] -> meas[0];\nmeasure q[1] -> meas[1];\n';
      this.userInput = this.placeholderCircuit;  
    }

    console.log('userInput:', this.userInput);
    console.log('selectedLanguage:', this.selectedLanguage);

    const requestBody = {
      programs: [
        {
          // quantumCircuit:
          // 'OPENQASM 2.0;\ninclude "qelib1.inc";\nqreg q[2];\ncreg meas[2];\nh q[0];\ncx q[0],q[1]; \
          // \nbarrier q[0],q[1];\nmeasure q[0] -> meas[0];\nmeasure q[1] -> meas[1];\n',
          quantumCircuit: this.userInput,
          assemblerLanguage: this.selectedLanguage,
        },
      ],
      name: this.deploymentName,
    };

    this.http
      .post('http://localhost:5005/deployments/', requestBody, {
        headers,
      })
      .subscribe(
        (data: any) => {
          this.deploymentResponse = JSON.stringify(data, null, 2);
                // Parse the JSON string into an object
          const parsedData = JSON.parse(this.deploymentResponse);

          this.deploymentID = parsedData.id;
          this.deploymentName = parsedData.name;
        },
        (error: any) => {
          this.deploymentResponse = 'Error occurred while making the request.';
        }
      );
  }

  getDeployments() {
    this.http
      .get('http://localhost:5005/deployments/', {
        headers: { accept: 'application/json' },
      })
      .subscribe(
        (data: any) => {
          this.getDeploymentResponse = JSON.stringify(data);
        },
        (error: any) => {
          this.getDeploymentResponse =
            'Error occurred while making the request.';
        }
      );
  }

  invokeJob() {
    const headers = new HttpHeaders()
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json');

      if (this.selectedPlatform === 'IBM'){
        this.selectedDevice = 'aer_simulator';
      } else if (this.selectedPlatform == 'AWS'){
        this.selectedDevice = 'local_simulator';
      }

    const requestBody = {
      name: this.jobName,
      providerName: this.selectedPlatform,
      deviceName: this.selectedDevice,
      shots: 4000,
      // parameters: [0],
      token: '',
      type: 'RUNNER',
      deploymentId: this.deploymentID,
    };

    this.http
      .post('http://localhost:5005/jobs/', requestBody, { headers })
      .subscribe(
        (data: any) => {
          this.jobResponse = JSON.stringify(data, null, 2);

                // Parse the JSON string into an object
          const parsedData = JSON.parse(this.jobResponse);

          this.jobID = parsedData.id;
        },
        (error: any) => {
          this.jobResponse = 'Error occurred while making the request.';
        }
      );
  }

  getResults(jobID: number) {
    const url = `http://localhost:5005/jobs/${jobID}/`;

    this.http.get(url, { headers: { accept: 'application/json' } }).subscribe(
      (data: any) => {
        this.result = data;
        this.extractCountsAndProbabilities();
      },
      (error: any) => {
        this.result = 'Error occurred while making the request.';
      }
    );
  }

  extractCountsAndProbabilities() {
    // Assuming 'results' is an array with only one item in this example
    const resultItem = this.result.results[0];

    if (resultItem && resultItem.result_dict) {
      this.counts = resultItem.result_dict.counts;
      this.probabilities = resultItem.result_dict.probabilities;
    } else {
      console.log('No valid result data found.');
    }
  }

  updatePlaceholder() {
    if (this.selectedLanguage === 'QASM2') {
      this.placeholderCircuit = 'OPENQASM 2.0;\ninclude "qelib1.inc";\nqreg q[2];\ncreg meas[2];\nh q[0];\ncx q[0],q[1]; \
      \nbarrier q[0],q[1];\nmeasure q[0] -> meas[0];\nmeasure q[1] -> meas[1];\n';
    } else if (this.selectedLanguage === 'QASM3') {
      this.placeholderCircuit = 'OPENQASM 3.0;\nbit[2] bits;\nqubit[2] qubits;\nh qubits[0];\ncnot qubits[0], qubits[1];\nbits[0] = measure qubits[0];\nbits[1] = measure qubits[1];';
    } else if (this.selectedLanguage === 'QISKIT'){
      this.placeholderCircuit = 'circuit = QuantumCircuit(2, 2);\ncircuit.h(0);\ncircuit.cx(0, 1);\ncircuit.measure(0, 0);\ncircuit.measure(1, 1)';
    } else if (this.selectedLanguage === 'BRAKET'){
      this.placeholderCircuit = 'Circuit().h(0).cnot(0, 1)';
    }
  }
}
