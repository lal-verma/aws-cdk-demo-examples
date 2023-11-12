import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import path = require('path');
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as autoscaling from 'aws-cdk-lib/aws-autoscaling';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import { RuntimeEnvironment } from './EnvUtil'; 


export class ContextConfigurationDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {

    super(scope, id, props);

    const runtime = new RuntimeEnvironment(this);
    console.log(runtime);

    //creating VPC
    const myExistingVpc = ec2.Vpc.fromLookup(this, 'demo-cache-vpc', {
      vpcId: runtime.vpcId
    })

    //creating EC2 Auto Scaling Group 
    new autoscaling.AutoScalingGroup(this, 'demo-cache-asg', {
      vpc: myExistingVpc,
      instanceType: new ec2.InstanceType('t4g.small'), 
      machineImage: ecs.EcsOptimizedImage.amazonLinux2(ecs.AmiHardwareType.ARM),
      desiredCapacity: runtime.asgDesired,
      minCapacity: runtime.asgMin,
      maxCapacity: runtime.asgMax,
    });


  }
}