import * as cdk from 'aws-cdk-lib';


const app = new cdk.App({});

import {SampleRedshiftStack} from '../lib/examples/SampleRedshift';
new SampleRedshiftStack(app, 'SampleRedshiftServerless', {});



























// import {EscapeHatchSample} from '../lib/escape-hatch/escape-hatch-sample';
// new EscapeHatchSample(app, 'EscapeHatchSampleStack');

// Uncomment this to deploy the demo for ECS Fargate
/* import {TodoServiceStack} from '../lib/examples/SampleECSFargate'
new TodoServiceStack(app,'todo-service-stack');
 */

// Uncomment this to deploy the demo for ECS EC2
/* import {TodoServiceStack} from '../lib/examples/SampleECSEC2'
new TodoServiceStack(app,'todo-service-stack');
 */

//uncomment below to enable removalpolicy demo
/* import {RemovalPolicyStack} from '../lib/resources/removal-policy-stack';
new RemovalPolicyStack(app, 'RemovalPolicyStack', {});
 */

/* import { TagsDemoStack_1} from '../lib/tags/TagsDemoStack';
const tagsDemoStack = new TagsDemoStack_1(app, 'TagsDemoStack', {});

 */

// Uncomment this to deploy the demo for Aspects
// import { AspectsDemoStack } from '../lib/aspects/AspectsDemoStack'; 
// new AspectsDemoStack(app, 'AspectsDemoStack', {});




// contexts example
/* import {ContextCustomDemoStack} from '../lib/context/ContextCustomDemoStack'
new ContextCustomDemoStack(app, 'ContextDemoStack', {
  env: {
    account: app.node.tryGetContext('account'),
    region: app.node.tryGetContext('region')
  }
}); */

// docker assets example
/* import {DockerAssetsDemoStack} from '../lib/assets/DockerAssetsDemoStack';
new DockerAssetsDemoStack(app, 'DockerAssetsDemoStack', {});
 */



/* import { RefResDifferentStack_DB, RefResDifferentStack_Service } from '../lib/resources/ref-res-different-stack';
const dbStack = new RefResDifferentStack_DB(app, 'RRStack-DB', {});
new RefResDifferentStack_Service(app, 'RRStack-Service', {todo_db: dbStack.todo_db});  */
 
//Uncomment this to deploy the demo for referencing resources in the same stack.
/* import { RRStack } from '../lib/resources/ref-res-same-stack';
new RRStack(app, 'RRStack', {});
 */


//Uncomment this to deploy the demo for defining environments
/* import { Microservice_A_Env } from '../lib/environments/microservice-A-env-v3';
new Microservice_A_Env(app, 'Microservice-A-env', {
  env: {
    account: process.env.AWS_DEV_ACCOUNT,
    region: process.env.AWS_DEV_REGION
  }
});
new Microservice_A_Env(app, 'Microservice-A-env-prod', {
  env: {
    account: process.env.AWS_PROD_ACCOUNT,
    region: process.env.AWS_PROD_REGION
  }
}); */


/* import { Microservice_A_Env } from '../lib/stacks/microservice-A-env-v2';
new Microservice_A_Env(app, 'Microservice-A-env');
 */


/* //demo code : grouping multiple stacks together
import { Microservice_A_Env } from '../lib/stacks/microservice-A-env';
new Microservice_A_Env(app, 'Microservice-A-staging');
new Microservice_A_Env(app, 'Microservice-A-prod');
 */

/* 
Uncomment this to deploy the demo for multiple stacks.

//Following code is to demo multiple
import { MicroserviceAStack } from '../lib/stacks/microservice-a-stack';
import { MicroserviceBStack } from '../lib/stacks/microservice-b-stack';

new MicroserviceAStack(app, 'microservice-A-stack', {});
new MicroserviceBStack(app, 'microservice-B-stack', {});
 */














// Uncomment this to deploy the first cdk stack.
// import { CdkSampleAppStack } from '../lib/my-first-cdk/cdk-sample-app-stack';
// new CdkSampleAppStack(app, 'CdkSampleAppStack', {
//   env: {
//     account: '123456789',
//     region: 'ap-south-1'
//   }
// });


app.synth();