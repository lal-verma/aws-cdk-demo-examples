import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import path = require('path');



export class RefResDifferentStack_DB extends cdk.Stack {
  todo_db: cdk.aws_dynamodb.TableV2;
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    this.todo_db = new dynamodb.TableV2(this, 'todo-db', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
    });
  }
}


export class RefResDifferentStack_Service extends cdk.Stack {

  constructor(scope: Construct, id: string, props: RefResDifferentStack_Service_Props) {
    super(scope, id, props);
    const todo_service_function = new lambda.Function(this, 'todo-service', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'todo-service.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../../sample-lambda-functions')),
    });

    todo_service_function.addEnvironment('TODO_DB_TABLE_NAME', props.todo_db.tableName);
    props.todo_db.grantReadWriteData(todo_service_function);
  }
}

interface RefResDifferentStack_Service_Props extends cdk.StackProps
{
  todo_db: cdk.aws_dynamodb.TableV2;
}
