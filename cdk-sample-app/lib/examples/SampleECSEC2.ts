import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as elbv2 from "aws-cdk-lib/aws-elasticloadbalancingv2";
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
    ecsCluster.addCapacity('todo-app-asg', {
      instanceType: new ec2.InstanceType('t4g.small'),
      machineImage: ecs.EcsOptimizedImage.amazonLinux2(ecs.AmiHardwareType.ARM),
      desiredCapacity: 1,
      minCapacity: 1,
      maxCapacity: 4
    });
    

    // Create Task Definition
    const taskDefinition = new ecs.Ec2TaskDefinition(scope, 'todo-app-td');
    taskDefinition.addContainer('todo-app-container', {
      image: ecs.ContainerImage.fromAsset(path.join(__dirname, '../../../sample-container-app')),
      containerName: 'todo-app-container',
      portMappings: [{ containerPort: 3000 }],
      memoryLimitMiB: 1024
    });

    // Create Service
    const todoAppECSService = new ecs.Ec2Service(scope, "Service", {
      cluster: ecsCluster,
      taskDefinition,
    });

    //creating ALB
    const todoAppALB = new elbv2.ApplicationLoadBalancer(this, 'todo-app-alb', {
      vpc: cdkDemoVpc, 
      internetFacing: true
    })  

    //adding listener to ALB
    const listener = todoAppALB.addListener('todo-app-listener', { port: 80 });
    //registering targets to ALB
    todoAppECSService.registerLoadBalancerTargets(
      {
        containerName: 'todo-app-container',
        containerPort: 3000,
        newTargetGroupId: 'todo-app-target-group',
        listener: ecs.ListenerConfig.applicationListener(listener, {
          protocol: elbv2.ApplicationProtocol.HTTP
        }),
      },
    );

    new cdk.CfnOutput(scope, 'LoadBalancerDNS', { value: todoAppALB.loadBalancerDnsName}); 
  }
}


export class TodoServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
  
    super(scope, id, props);

    new TodoServiceConstruct(this,'todo-service-app');
  }

}