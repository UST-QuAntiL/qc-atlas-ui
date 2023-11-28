import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Redudant, can be removed or later refined and used as a module

@Component({
  selector: 'app-ondemand',
  templateUrl: './ondemand.component.html',
  styleUrls: ['./ondemand.component.css'],
})
export class OnDemandComponent {
  response: any;
  jobResponse: any;
  deploymentResponse: any;
  deviceResponse: any;
  result: any;

  constructor(private http: HttpClient) {}

  getJobs() {
    this.http
      .get('http://localhost:8080/jobs/', {
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

    const requestBody = {
      programs: [
        {
          quantumCircuit:
            'OPENQASM 2.0;\ninclude "qelib1.inc";\nqreg q[2];\ncreg meas[2];\nh q[0];\ncx q[0],q[1];\nbarrier q[0],q[1];\nmeasure q[0] -> meas[0];\n \
            measure q[1] -> meas[1];\n',
          assemblerLanguage: 'QASM2',
        },
      ],
      name: 'SeQuenC-UseCase',
    };

    this.http
      .post('http://localhost:8080/deployments/', requestBody, {
        headers,
      })
      .subscribe(
        (data: any) => {
          this.deploymentResponse = JSON.stringify(data, null, 2);
        },
        (error: any) => {
          this.deploymentResponse = 'Error occurred while making the request.';
        }
      );
  }

  invokeJob() {
    const headers = new HttpHeaders()
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json');

    const requestBody = {
      name: 'JobName',
      providerName: 'IBM',
      deviceName: 'aer_simulator',
      shots: 4000,
      token: '',
      type: 'RUNNER',
      deploymentId: 1,
    };

    this.http
      .post('http://localhost:8080/jobs/', requestBody, { headers })
      .subscribe(
        (data: any) => {
          this.jobResponse = JSON.stringify(data, null, 2);
        },
        (error: any) => {
          this.jobResponse = 'Error occurred while making the request.';
        }
      );
  }

  getResults() {
    this.http
      .get('http://localhost:8080/jobs/3/', {
        headers: { accept: 'application/json' },
      })
      .subscribe(
        (data: any) => {
          this.result = JSON.stringify(data, null, 2);
        },
        (error: any) => {
          this.result = 'Error occurred while making the request.';
        }
      );
  }
}
