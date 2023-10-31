import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from '../../../util/util.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { OnDemandComponent } from '../../on-demand-execution/ondemand.component';

@Component({
  selector: 'qunicorn-service',
  templateUrl: './qunicorn-service.component.html',
  styleUrls: ['./qunicorn-view.component.scss'],
})
export class QunicornAppComponent implements OnInit {
  tableColumns = ['Name'];
  variableNames = ['name'];
  loading = true;

  constructor(
    private router: Router,
    private utilService: UtilService,
    private http: HttpClient
  ) { }

  ngOnInit(): void { }


  response: any;
  jobResponse: any;
  deploymentResponse: any;
  getDeploymentResponse: any;
  deviceResponse: any;
  result: any;


  getJobs() {
    this.http.get('http://localhost:8080/jobs/', { headers: { accept: 'application/json' } })
      .subscribe((data: any) => {
        this.response = JSON.stringify(data);
      }, (error: any) => {
        this.response = 'Error occurred while making the request.';
      });
  }


  submitDeployment() {
    const headers = new HttpHeaders()
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json');

    const requestBody = {
      programs: [
        {
          quantumCircuit: "OPENQASM 2.0;\ninclude \"qelib1.inc\";\nqreg q[2];\ncreg meas[2];\nh q[0];\ncx q[0],q[1];\nbarrier q[0],q[1];\nmeasure q[0] -> meas[0];\nmeasure q[1] -> meas[1];\n (Note: if you have qrisp/qiskit as your assembler language add 'circuit =' to the beginning of your quantumCircuit string)",
          assemblerLanguage: "QASM2"
        }
      ],
      name: "SeQuenC-UseCase"
    };

    this.http.post('http://localhost:8080/deployments/', requestBody, { headers: headers })
      .subscribe((data: any) => {
        this.deploymentResponse = JSON.stringify(data, null, 2);
      }, (error: any) => {
        this.deploymentResponse = 'Error occurred while making the request.';
      });
  }

  getDeployments() {
    this.http.get('http://localhost:8080/deployments/', { headers: { accept: 'application/json' } })
      .subscribe((data: any) => {
        this.getDeploymentResponse = JSON.stringify(data);
      }, (error: any) => {
        this.getDeploymentResponse = 'Error occurred while making the request.';
      });
  }

  invokeJob() {
    const headers = new HttpHeaders()
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json');

    const requestBody = {
      name: "JobName",
      providerName: "IBM",
      deviceName: "aer_simulator",
      shots: 4000,
      parameters: [0],
      token: "",
      type: "RUNNER",
      deploymentId: 1
    };

    this.http.post('http://localhost:8080/jobs/', requestBody, { headers: headers })
      .subscribe((data: any) => {
        this.jobResponse = JSON.stringify(data, null, 2);
      }, (error: any) => {
        this.jobResponse = 'Error occurred while making the request.';
      });
  }

  getResults() {
    this.http.get('http://localhost:8080/jobs/3/', { headers: { accept: 'application/json' } })
      .subscribe((data: any) => {
        this.result = JSON.stringify(data, null, 2);
      }, (error: any) => {
        this.result = 'Error occurred while making the request.';
      });
  }



}
