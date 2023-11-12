import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Asset } from 'aws-cdk-lib/aws-s3-assets';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import path = require('path');


export class ConstructsSampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {

    super(scope, id, props);

    this.generate_L1_Construct();
    this.generate_L2_Construct();
    this.generate_L3_Construct();
  }


  /**
   * This method generates a sample L1 construct - Lambda Function & IAM Role 
   */
  private generate_L1_Construct() {

    //sample cfn role
    const sampleCfnRole = new iam.CfnRole(this, 'sample-l1-role', {
      assumeRolePolicyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'sts:AssumeRole',
            Effect: 'Allow',
            Principal: {
              Service: 'lambda.amazonaws.com',
            }
          }
        ]
      },
      description: 'sample cfn role',
      managedPolicyArns: ['arn:aws:iam::aws:policy/AWSLambdaExecute'],
      roleName: 'sample-l1-role',
    });

    const lambdaFunctionSourceCode = new Asset(this, "sample-l1-code'", {
      path: path.join(__dirname, "../../../sample-lambda-functions")
    });

    //sample cfn function
    new lambda.CfnFunction(this, 'sample-l1-function', {
      functionName: 'sample-l1-function',
      code: {
        s3Bucket: lambdaFunctionSourceCode.s3BucketName,
        s3Key: lambdaFunctionSourceCode.s3ObjectKey
      },
      runtime: 'nodejs18.x',
      handler: 'sample-l1-function.handler',
      role: sampleCfnRole.attrArn
    })
  }

  //implementing sample L1 Construct

  private generate_L2_Construct() {
    return new lambda.Function(this, 'sample-l2-function', {
      functionName: 'sample-l2-function',
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'sample-l2-function.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../../sample-lambda-functions')),
    });
  }













  
  private generate_L3_Construct() {

    const api = new apigateway.LambdaRestApi(this, 'sample-l3-api', {
      handler: new lambda.Function(this, 'sample-l3-function', {
        functionName: 'sample-l3-function',
        runtime: lambda.Runtime.NODEJS_18_X,
        handler: 'sample-l3-function.handler',
        code: lambda.Code.fromAsset(path.join(__dirname, '../../../sample-lambda-functions')),
      }),
      proxy: true,      
    });

  }
}
