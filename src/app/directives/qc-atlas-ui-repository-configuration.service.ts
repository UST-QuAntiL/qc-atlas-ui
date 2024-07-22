import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export enum UiFeatures {
  NISQ_ANALYZER = 'nisqAnalyzer',
  QPROV = 'qprov',
  PATTERN_ATLAS = 'patternAtlas',
  NISQ_ANALYZER_COMPILER_COMPARISON = 'nisqAnalyzerCompilerComparison',
  NISQ_ANALYZER_QPU_SELECTION = 'nisqAnalyzerQpuSelection',
  SHOW_SETTINGS = 'showSettings',
  ENABLE_EDITING = 'enableEditing',
}

export interface QcAtlasUiConfiguration {
  features: {
    nisqAnalyzer: boolean;
    qprov: boolean;
    patternAtlas: boolean;
    nisqAnalyzerCompilerComparison: boolean;
    nisqAnalyzerQpuSelection: boolean;
    showSettings: boolean;
    enableEditing: boolean;
  };
}

interface EtcdResponse {
  action: string;
  node: EtcdNode;
}

interface EtcdNode {
  dir?: boolean;
  key: string;
  value?: string;
  nodes?: EtcdNode[];
  modifiedIndex: number;
  createdIndex: number;
}

const initialValues: QcAtlasUiConfiguration = {
  features: {
    nisqAnalyzer: false,
    qprov: false,
    patternAtlas: false,
    nisqAnalyzerCompilerComparison: false,
    nisqAnalyzerQpuSelection: false,
    showSettings: false,
    enableEditing: false,
  },
};

@Injectable()
export class QcAtlasUiRepositoryConfigurationService {
  configuration: QcAtlasUiConfiguration;

  constructor(private http: HttpClient) {}

  /**
   * Sets the configuration Attribute for the service => Access the configuration file from the resource
   * In case of error
   * Is the style below the method better/is it applicable?
   */
  getConfigurationFromBackend(): Observable<QcAtlasUiConfiguration> {
    return this.http
      .get<EtcdResponse>(
        environment.CONFIG_SEVER_URL + '/features?recursive=true'
      )
      .pipe(
        map((response: EtcdResponse) => {
          this.configuration = initialValues;
          this.parseNode(response.node, this.configuration);
          return this.configuration;
        }),
        catchError((err) => {
          this.configuration = initialValues;
          console.warn('Could not load config from etcd store!', err);
          return of(this.configuration);
        })
      );
  }

  applyConfig(feature: UiFeatures, checked: boolean): Observable<string> {
    const url = environment.CONFIG_SEVER_URL + '/features/' + feature;

    return this.http.put<string>(
      url,
      {},
      { params: { value: String(checked) } }
    );
  }

  /**
   * etcd stores and serves the configuration in a from like
   * <code>{ "key": "/features", "dir": true, "nodes": [
   * { "key": "/feature/hello", "value": "world" } ] }</code>.
   * Thus, we must parse it and represent it in the form of a TypeScript object.
   *
   * As a result, this method returns the following JS object for the presented example:
   * <code>{ features: { hello: 'world' } }</code>
   *
   * @param node the etcd node to parse.
   * @param obj the object to store the parsed values in.
   * @private
   */
  private parseNode(node: EtcdNode, obj: QcAtlasUiConfiguration): void {
    const slashIndex = node.key.lastIndexOf('/');
    const key = node.key.substring(slashIndex + 1);
    if (node.nodes) {
      node.nodes.forEach((child) => this.parseNode(child, obj[key]));
    } else {
      const value = node.value.toLowerCase();
      if (value === 'true' || value === 'on' || value === 'yes') {
        obj[key] = true;
      } else if (value === 'false' || value === 'off' || value === 'no') {
        obj[key] = false;
      } else {
        obj[key] = value;
      }
    }
  }
}
