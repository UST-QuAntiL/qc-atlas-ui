import { Tag } from '../model/tag.model';
import { Qpu } from '../model/qpu.model';
import { Provider } from '../model/provider.model';
import { Implementation } from '../model/implementation.model';
import { Content } from '../model/content.model';
import { Algorithm } from '../model/algorithm.model';
import { Parameter } from '../model/parameter.model';

export class EntityCreator {
  public static createTagFromDialogResult(dialogResult: any): Tag {
    return {
      key: dialogResult.key,
      value: dialogResult.value,
    };
  }

  public static createQpuFromDialogResult(dialogResult: any): Qpu {
    return {
      maxGateTime: dialogResult.maxGateTime,
      name: dialogResult.name,
      numberOfQubits: dialogResult.numberOfQubits,
      t1: dialogResult.t1,
      supportedSdkIds: dialogResult.supportedSdkIds,
    };
  }

  public static createProviderFromDialogResult(dialogResult: any): Provider {
    return {
      name: dialogResult.name,
      accessKey: dialogResult.accessKey,
      secretKey: dialogResult.secretKey,
    };
  }

  public static createContentFromDialogResult(dialogResult: any): Content {
    return {
      description: dialogResult.description,
    };
  }

  public static createParameterFromDialogResult(dialogResult: any): Parameter {
    return {
      name: dialogResult.name,
      description: dialogResult.description,
      type: dialogResult.type,
      restriction: dialogResult.restriction,
    };
  }

  public static createAlgorithmFromDialogResult(
    dialogResult: any,
    resultContent: Content
  ): Algorithm {
    return {
      name: dialogResult.name,
      inputParameters: dialogResult.inputParameters,
      content: resultContent,
      outputParameters: dialogResult.outputParameters,
      tags: [dialogResult.tag],
    };
  }

  public static createImplementationFromDialogResult(
    dialogResult: any,
    resultContent: Content
  ): Implementation {
    return {
      name: dialogResult.name,
      sdk: dialogResult.sdk.name,
      content: resultContent,
      fileLocation: dialogResult.fileLocation,
      programmingLanguage: dialogResult.programmingLanguage,
      selectionRule: dialogResult.selectionRule,
      inputParameters: dialogResult.inputParameters,
      outputParameters: dialogResult.outputParameters,
      tags: [dialogResult.tag],
    };
  }
}
