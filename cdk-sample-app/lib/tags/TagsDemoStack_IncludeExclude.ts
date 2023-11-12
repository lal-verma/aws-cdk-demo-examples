import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';


import path = require('path');
/**
 * TagsDemoStack_1 (exclude)
 *  -todo-service
 *  -todo-db * 
 * TagsDemoStack_2 (include)
 *  - todo-service
 *  - todo-db

 */

export class TagsDemoStack_1 extends cdk.Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);


    const todo_service_function =new lambda.Function(this, 'todo-service', {
        runtime: lambda.Runtime.NODEJS_18_X,
        handler: 'todo-service.handler',
        code: lambda.Code.fromAsset(path.join(__dirname, '../../../sample-lambda-functions')),
        
    });

    const todo_db = new dynamodb.Table(this, 'todo-db', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
 
    cdk.Tags.of(this).add('microservice', 'todo-service', {
      excludeResourceTypes: ['AWS::DynamoDB::Table'],
    });
  
  }
}

export class TagsDemoStack extends cdk.Stack {

  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);


    cdk.Tags.of(this).add('microservice', 'todo-service', {
      excludeResourceTypes: ['AWS::DynamoDB::Table']
    });

    //other code below
  
  }
}