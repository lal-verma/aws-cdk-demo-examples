import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import path = require('path');

/**
 * TagsDemoStack
 *  -todo-service
 *  -todo-db
 */


export class TagsDemoStack extends cdk.Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);


    const todo_service =new lambda.Function(this, 'todo-service', {
        runtime: lambda.Runtime.NODEJS_18_X,
        handler: 'todo-service.handler',
        code: lambda.Code.fromAsset(path.join(__dirname, '../../../sample-lambda-functions')),
        
    });

    new dynamodb.TableV2(this, 'todo-db', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
    });

    cdk.Tags.of(this).add('microservice', 'todo-service');

    cdk.Tags.of(todo_service).add('microservice', 'todo-service-v2',{priority: 300});    
  
  }
}