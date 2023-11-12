import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import path = require('path');


export class MicroserviceBStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {

    super(scope, id, props);


    new lambda.Function(this, 'microservice-B', {
      functionName: 'microservice-B',
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'microservice-B.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../../sample-lambda-functions')),
    });

  }


}
