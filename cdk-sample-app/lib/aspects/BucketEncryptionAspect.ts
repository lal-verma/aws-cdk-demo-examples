import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { IConstruct } from 'constructs';
import { Tokenization } from 'aws-cdk-lib';
import { Annotations } from 'aws-cdk-lib';

export class BucketEncryptionAspect implements cdk.IAspect {
    
    public visit(node: IConstruct): void {
      if (node instanceof s3.CfnBucket) {
        if (!node.bucketEncryption) {
          // validation error     
        }
      }
    }
}

