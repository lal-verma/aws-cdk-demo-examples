import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as redshift from 'aws-cdk-lib/aws-redshiftserverless';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as secrets from 'aws-cdk-lib/aws-secretsmanager';






export class SampleRedshiftStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
  
    super(scope, id, props);

    const redshiftRole  = new iam.Role(this, 'redshift-serverless-role', {
        assumedBy: new iam.ServicePrincipal('redshift-serverless.amazonaws.com'),
        managedPolicies: [
            iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonRedshiftAllCommandsFullAccess'),
            iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'),
        ]
    })

    const redshiftSecretArn =  'arn:aws:secretsmanager:us-east-2:480935361548:secret:redshift/admin-0OiasS';
  

    //creating namespace
    const demoNamespace = new redshift.CfnNamespace(this, 'sample-serverless-ns', {
        namespaceName: 'demo-serverless-ns1',
        iamRoles: [redshiftRole.roleArn],
        defaultIamRoleArn: redshiftRole.roleArn,
        // adminUsername: cdk.SecretValue.secretsManager(redshiftSecretArn, {jsonField: 'username'}).toString(),
        // adminUserPassword: cdk.SecretValue.secretsManager(redshiftSecretArn, {jsonField: 'userpwd'}).toString(),        
    });    

    //creating workgroup
    const demoWorkGroup = new redshift.CfnWorkgroup(this, 'sample-serverless-wg', {
        workgroupName: 'demo-serverless-wg1',      
        // the properties below are optional
        baseCapacity: 8,
        port: 5439,
        publiclyAccessible: false,
        namespaceName: demoNamespace.namespaceName,
      });

      //sample-data-dev
      demoWorkGroup.addDependency(demoNamespace);
      
  }
}