import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import path = require('path');





/**
 * Following Stack provisions the AWS resources for Microservice A API
 */
class MicroserviceA_API_Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {

    super(scope, id, props);

    new lambda.Function(this, 'microservice-A', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'microservice-A.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../../sample-lambda-functions')),
    });
  }
}


/**
 * Following Stack provisions the AWS resources for Microservice A Database - DynamoDB
 */
class MicroserviceA_DB_Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {

    super(scope, id, props);

    new dynamodb.TableV2(this, 'service-a-db', {
      partitionKey: { name: 'pk', type: dynamodb.AttributeType.STRING },
    });
  }
}


export class Microservice_A_Env extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new MicroserviceA_API_Stack(this, 'API_Stack');
    new MicroserviceA_DB_Stack(this, 'DB_Stack');
  }
}