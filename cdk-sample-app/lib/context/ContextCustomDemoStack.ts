import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import path = require('path');
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as autoscaling from 'aws-cdk-lib/aws-autoscaling';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import { RuntimeEnvironment } from './EnvUtil'; 


export class ContextCustomDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {

    super(scope, id, props);

    //creating VPC
    const myExistingVpc = ec2.Vpc.fromLookup(this, 'demo-cache-vpc', {
      vpcId: this.node.tryGetContext('vpc')
    })

    //creating EC2 Auto Scaling Group 
    new autoscaling.AutoScalingGroup(this, 'demo-cache-asg', {
      vpc: myExistingVpc,
      instanceType: new ec2.InstanceType('t4g.small'), 
      machineImage: ecs.EcsOptimizedImage.amazonLinux2(ecs.AmiHardwareType.ARM),
      desiredCapacity: 1,
      minCapacity: 1,
      maxCapacity: 10,
    });


    console.log('context value - account:',this.node.tryGetContext('account'))
    console.log('context value - region:',this.node.tryGetContext('region'))
    console.log('context value - vpc:',this.node.tryGetContext('vpc'))

  }
}