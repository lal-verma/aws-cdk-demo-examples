#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { SamplePipelineStack } from '../lib/pipeline/sample-pipeline-stack';

const app = new cdk.App();
new SamplePipelineStack(app, 'SamplePipelineStack', {
  env: {
    account: '123456789',
    region: 'us-east-2',
  }
});

app.synth();