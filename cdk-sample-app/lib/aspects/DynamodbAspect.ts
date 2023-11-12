import * as cdk from 'aws-cdk-lib';
import { IConstruct } from 'constructs';
import { Annotations } from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class DynamodbAspect implements cdk.IAspect {
  public visit(node: IConstruct): void {
    if (node instanceof dynamodb.CfnTable) {
      Annotations.of(node).addError('Only global tables are allowed');
    }
  }
}