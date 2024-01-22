import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { BucketVersioningAspect } from './BucketVersioningAspect';
import { Aspects } from 'aws-cdk-lib';
import { DynamodbAspect } from './DynamodbAspect';
import * as s3 from 'aws-cdk-lib/aws-s3';



export class AspectsDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    //defining sample s3 buckets
    new s3.Bucket(this, 'test-bucket-1', {
      versioned: true,
      autoDeleteObjects: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    new s3.Bucket(this, 'test-bucket-2', {
      autoDeleteObjects: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    new s3.Bucket(this, 'test-bucket-3', {
      versioned: false,
      autoDeleteObjects: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    //defining sample dynamodb tables
    new cdk.aws_dynamodb.TableV2(this, 'test-table-1', {
      partitionKey: { name: 'id', type: cdk.aws_dynamodb.AttributeType.STRING },
    });

    new cdk.aws_dynamodb.Table(this, 'test-table-2', {
      partitionKey: { name: 'id', type: cdk.aws_dynamodb.AttributeType.STRING },
    });

    Aspects.of(this).add(new BucketVersioningAspect());
    Aspects.of(this).add(new DynamodbAspect());

    cdk.Tags.of(this).add('Owner', 'lal');
    console.log(Aspects.of(this));

  }
}