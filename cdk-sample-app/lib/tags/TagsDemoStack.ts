import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import path = require('path');

/**
 * TagsDemoStack_1
 *  - todo-db
 *  - todo-service
 * TagsDemoStack_2
 *  - todo-db
 *  - todo-service
 */

export class TagsDemoStack_1 extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {

    super(scope, id, props);

    new dynamodb.Table(this, 'todo-db', {
        partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
    });


    new lambda.Function(this, 'todo-service', {
        runtime: lambda.Runtime.NODEJS_18_X,
        handler: 'todo-service.handler',
        code: lambda.Code.fromAsset(path.join(__dirname, '../../../sample-lambda-functions')),
    });
  
    cdk.Tags.of(this).add('microservice', 'todo-service');
  }
}

/**
 * Following Stack provisions the AWS resources for Microservice A Database - DynamoDB
 */
export class TagsDemoStack_2 extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {

    super(scope, id, props);

    new dynamodb.TableV2(this, 'todo-db', {
        partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
    });


    const todo_service_function = new lambda.Function(this, 'todo-service', {
        runtime: lambda.Runtime.NODEJS_18_X,
        handler: 'todo-service.handler',
        code: lambda.Code.fromAsset(path.join(__dirname, '../../../sample-lambda-functions')),
        
    }); 

    cdk.Tags.of(todo_service_function).add('microservice', 'todo-service-v2');

  }
}
