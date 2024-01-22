import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

/**
 * Sample Implementation
 * Deploying a sample containerized application on ECS - Fargate
 * [ECS Cluster, ECS Task Definition, ECS Service, Load Balancer]
 * 
 */

export class CodeWhispererDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {  
    super(scope, id, props);
    
    //create an AWS VPC
    const vpc = new cdk.aws_ec2.Vpc(this, "VPC", {
      maxAzs: 2,
    });

    //create an ECS Cluster
    const cluster = new cdk.aws_ecs.Cluster(this, "Cluster", {
      vpc,
      clusterName: "codewhisperer-demo",
    });

    //create a Task Definition
    const taskDefinition = new cdk.aws_ecs.FargateTaskDefinition(this, "TaskDef");
    taskDefinition.addContainer("Container", {
      image: cdk.aws_ecs.ContainerImage.fromRegistry("amazon/amazon-ecs-sample"),
      memoryLimitMiB: 512,
      cpu: 256,
      portMappings: [{ containerPort: 80 }],
      logging: new cdk.aws_ecs.AwsLogDriver({ streamPrefix: "codewhisperer-demo" }),
    });

    //create a Fargate Service
    const service = new cdk.aws_ecs.FargateService(this, "Service", {
      cluster,
      taskDefinition,
      desiredCount: 2,
      serviceName: "codewhisperer-demo",
    });

    //create a load balancer 
    const loadBalancer = new cdk.aws_elasticloadbalancingv2.ApplicationLoadBalancer(this, "LB", {
      vpc,
      internetFacing: true
    });

    //create a listener
    const listener = loadBalancer.addListener("Listener", {
      port: 80,
    });

    //create a target group
    const targetGroup = listener.addTargets("TargetGroup", {
      port: 80,
      targets: [service],
    });

    new cdk.CfnOutput(this, "LoadBalancerDNS", {
      value: loadBalancer.loadBalancerDnsName,
    });
     
  }

}