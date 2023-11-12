import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import path = require('path');
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as autoscaling from 'aws-cdk-lib/aws-autoscaling';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import { RuntimeEnvironment } from './EnvUtil'; 


export class ContextCacheDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {

    super(scope, id, props);

    //creating VPC
    const myExistingVpc = ec2.Vpc.fromLookup(this, 'context-cache-vpc', {
      vpcId: "vpc-00f8ab072339af6e0"
    })

    // console.log('myExistingVpc',myExistingVpc);

    //adding EC2 Auto Scaling Group 
    new autoscaling.AutoScalingGroup(this, 'context-cache-asg', {
      vpc: myExistingVpc,
      instanceType: new ec2.InstanceType('t4g.small'), //ec2 compatible with ARM 64 - M6g, T4g, C6g, R6gdm X2gd
      machineImage: ecs.EcsOptimizedImage.amazonLinux2(ecs.AmiHardwareType.ARM),
      desiredCapacity: 1,
      minCapacity: 1,
      maxCapacity: 11,
    });

  }
}