import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import path = require('path');
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecr_assets from 'aws-cdk-lib/aws-ecr-assets';

//Tier specific constructs, configurations, logic
export class DatabaseTier extends Construct {

  constructor(scope: Construct, id: string) {
    super(scope, id);

    new cdk.aws_dynamodb.TableV2(this, 'sample-database', {
      partitionKey: { name: 'id', type: cdk.aws_dynamodb.AttributeType.STRING },
    })
  }

}


//deployment specific configurations, logic
export class DatabaseTierStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {

    super(scope, id, props);

    new DatabaseTier(this, 'DatabaseTier');
  }
}


//defining docker assets demo stack
export class DockerAssetsDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {

    super(scope, id, props);

    const taskDefinition = new ecs.FargateTaskDefinition(this, "todo-app-task", {
      memoryLimitMiB: 1024,
      cpu: 512
    });

    const asset = new ecr_assets.DockerImageAsset(this, 'todo-app-container-image', {
      directory: path.join(__dirname, '../../../sample-container-app'),
      assetName: 'todo-app-container-image'
    }); 
    
    taskDefinition.addContainer('todo-app-container', {
      image: ecs.ContainerImage.fromDockerImageAsset(asset),
    })
  }
}

//multiple stacks, multiple environments
const app = new cdk.App();

const assets_stack_test = new DockerAssetsDemoStack(app, 'DockerAssetsDemoStack-test', {
  env: {account: process.env.CDK_DEFAULT_ACCOUNT,region: process.env.CDK_DEFAULT_REGION},
  terminationProtection:false,
  analyticsReporting: false
  })

const assets_stack_stage = new DockerAssetsDemoStack(app, 'DockerAssetsDemoStack-stage', {
  env: {account: process.env.CDK_DEFAULT_ACCOUNT,region: process.env.CDK_DEFAULT_REGION},
  terminationProtection:false,
  analyticsReporting: true
  })

const assets_stack_prod = new DockerAssetsDemoStack(app, 'DockerAssetsDemoStack-prod', {
  env: {account: process.env.CDK_DEFAULT_ACCOUNT,region: process.env.CDK_DEFAULT_REGION},
  terminationProtection:true,
  analyticsReporting: true
  })

//LogicalIDAspect - ensures the logical id is not changed
export class LogicalIDAspect implements cdk.IAspect {
    
  public visit(node: Construct): void {
    if (node instanceof cdk.aws_dynamodb.CfnGlobalTable) {
      node.overrideLogicalId("fixed-logical-id");      
    }
  }
}