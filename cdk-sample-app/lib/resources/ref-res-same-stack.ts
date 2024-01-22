import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import path = require('path');

export class RRStack extends cdk.Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);


    const todo_db = new dynamodb.TableV2(this, 'todo-db', {
        partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
    });


    const todo_service_function = new lambda.Function(this, 'todo-service', {
        runtime: lambda.Runtime.NODEJS_18_X,
        handler: 'todo-service.handler',
        code: lambda.Code.fromAsset(path.join(__dirname, '../../../sample-lambda-functions')),
        
    });
    

    todo_service_function.addEnvironment('TODO_DB_TABLE_NAME', todo_db.tableName);
    
    todo_db.grantReadWriteData(todo_service_function);


  }
}