import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import path = require('path');


export class EscapeHatchSample extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const myBucket = new s3.Bucket(this, 'my-bucket', {
      //available properties
    });

    const myCfnBucket = myBucket.node.defaultChild as s3.CfnBucket;
    myCfnBucket.addOverride('VersioningConfiguration.Status', 'new-status');
    myCfnBucket.addOverride('NewProperty', 'new-property-value');
  }
}
