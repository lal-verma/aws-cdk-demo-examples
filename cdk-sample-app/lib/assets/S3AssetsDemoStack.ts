import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import path = require('path');



export class S3AssetsDemoStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
  
      super(scope, id, props);
  
      new lambda.Function(this, 'sample-l2-function', {
        functionName: 'sample-l2-function',
        runtime: lambda.Runtime.NODEJS_18_X,
        handler: 'sample-l2-function.handler',
        code: lambda.Code.fromAsset(path.join(__dirname, '../../../sample-lambda-functions')),
      });
    }
}
