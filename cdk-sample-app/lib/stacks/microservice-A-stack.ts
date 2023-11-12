import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import path = require('path');


export class MicroserviceAStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {

    super(scope, id, props);

    new lambda.Function(this, 'microservice-A', {
      functionName: 'microservice-A-api',
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'microservice-A.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../../sample-lambda-functions')),
    });
}

}

