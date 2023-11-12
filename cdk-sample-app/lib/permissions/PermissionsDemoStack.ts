import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import path = require('path');
import * as iam from 'aws-cdk-lib/aws-iam';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as s3 from 'aws-cdk-lib/aws-s3';








export class GrantsDemoStack_1 extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {

    super(scope, id, props);

    const todo_db = new dynamodb.TableV2(this, 'todo-db', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
    });


    const todo_service_function = new lambda.Function(this, 'todo-service', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'todo-service.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../../sample-lambda-functions')),

    });

    todo_service_function.addToRolePolicy(new iam.PolicyStatement({
      actions: ['dynamodb:*'],
      resources: [todo_db.tableArn],
      effect: iam.Effect.ALLOW
    }));

    todo_service_function.addEnvironment('TODO_DB_TABLE_NAME', todo_db.tableName);
  }
}


export class GrantsDemoStack_2 extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {

    super(scope, id, props);

    const todo_db = new dynamodb.TableV2(this, 'todo-db', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
    });


    const todo_service_function = new lambda.Function(this, 'todo-service', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'todo-service.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../../sample-lambda-functions')),

    });

    const grant = todo_db.grantReadWriteData(todo_service_function);
    todo_db.node.addDependency(grant);



    todo_service_function.addEnvironment('TODO_DB_TABLE_NAME', todo_db.tableName);
  }
}


export class RolesDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {

    super(scope, id, props);

    const lambdaRole = new iam.Role(this, 'lambda-role', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),   // required
    });

    lambdaRole.addToPolicy(new iam.PolicyStatement({
      actions: ['dynamodb:*'],
      resources: ['*'],
      effect: iam.Effect.ALLOW
    }));
  }
}



export class RolesDemoStack_2 extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {

    super(scope, id, props);

    const todo_db = new dynamodb.TableV2(this, 'todo-db', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
    });

    const lambdaRole = new iam.Role(this, 'lambda-role', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),   // required
    });

    lambdaRole.addToPolicy(new iam.PolicyStatement({
      actions: ['dynamodb:*'],
      resources: [todo_db.tableArn],
      effect: iam.Effect.ALLOW
    }));

    const todo_service_function = new lambda.Function(this, 'todo-service', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'todo-service.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../../sample-lambda-functions')),
      role: lambdaRole,
    });
  }
}


export class RolesDemoStack_3 extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {

    super(scope, id, props);

    const todo_db = new dynamodb.TableV2(this, 'todo-db', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
    });

    const todo_service_function = new lambda.Function(this, 'todo-service', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'todo-service.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../../sample-lambda-functions')),
    });


  }
}


export class ResourcePolicyDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {

    super(scope, id, props);

    const demo_bucket = new s3.Bucket(this, 'demo-bucket');

    const lambdaRole = new iam.Role(this, 'lambda-role', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),   // required
    });

    demo_bucket.addToResourcePolicy(new iam.PolicyStatement({
      actions: ['s3:*'],
      resources: [demo_bucket.bucketArn],
      principals: [lambdaRole],
    }));    
    
    //rest of the code...
  }
}


export class ExternalResourceDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {

    super(scope, id, props);

    const externalRole =  iam.Role.fromRoleArn(this, 
      'external-role', 
      'arn:aws:iam::123456789:role/PermissionsDemoStack-lambdaroleDFE21467-q1C0PsLXB1do',
      {});

      externalRole.addToPrincipalPolicy(new iam.PolicyStatement({
        actions: ['s3:*'],
        resources: ['*'],
        effect: iam.Effect.ALLOW
      }));
    
    //rest of the code...
  }
}