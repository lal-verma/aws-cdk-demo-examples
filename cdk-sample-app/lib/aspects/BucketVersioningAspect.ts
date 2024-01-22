import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { IConstruct } from 'constructs';
import { Tokenization } from 'aws-cdk-lib';
import { Annotations } from 'aws-cdk-lib';

export class BucketVersioningAspect implements cdk.IAspect {

  public visit(node: IConstruct): void {
    if (node instanceof s3.CfnBucket) {
      // Check for versioning property
      if (!node.versioningConfiguration
        || (!Tokenization.isResolvable(node.versioningConfiguration)
          && node.versioningConfiguration.status !== 'Enabled')) {
        Annotations.of(node).addError('Bucket versioning is not enabled');
      }
    }
  }
}