import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecr_assets from 'aws-cdk-lib/aws-ecr-assets';
import * as ecs_patterns from "aws-cdk-lib/aws-ecs-patterns";
import path = require('path');


class TodoServiceConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    //creating VPC
    const cdkDemoVpc = new ec2.Vpc(scope, "cdk-demo-vpc", {
      maxAzs: 2 
    });

    //creating ECS Cluster
    const ecsCluster = new ecs.Cluster(scope, "cdk-demo-ecs-cluster", {
      vpc: cdkDemoVpc
    });

    //creating fargate service
    new ecs_patterns.ApplicationLoadBalancedFargateService(scope, "todo-app-service", {
      cluster: ecsCluster, 
      cpu: 512, 
      desiredCount: 2, 
      memoryLimitMiB: 1024, 
      publicLoadBalancer: true, 
      taskImageOptions:{
        image: ecs.ContainerImage.fromAsset(path.join(__dirname, '../../../sample-container-app')),
        containerPort: 3000,
        containerName: 'todo-app-container'
      },
      runtimePlatform : {
        operatingSystemFamily: ecs.OperatingSystemFamily.LINUX,
        cpuArchitecture: ecs.CpuArchitecture.ARM64,
      },     
    })
  }
}


export class TodoServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
  
    super(scope, id, props);

    new TodoServiceConstruct(this,'todo-service-app');
  }

}