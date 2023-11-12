import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecr_assets from 'aws-cdk-lib/aws-ecr-assets';
import path = require('path');

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

