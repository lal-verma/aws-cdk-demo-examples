import * as cdk from 'aws-cdk-lib';
import { Template, Match, Capture } from 'aws-cdk-lib/assertions';
import { TagsDemoStack_1 } from '../lib/tags/TagsDemoStack';


//demo: Capture
test('match test', () => {
  const app = new cdk.App();
  const stack = new TagsDemoStack_1(app, 'TagsDemoStack-test');
  const template = Template.fromStack(stack);

  const tagsCaptureLambda = new Capture();
  const tagCaptureDynamodb = new Capture();

  template.hasResourceProperties('AWS::Lambda::Function',
    {
      Tags: tagsCaptureLambda
    });
  template.hasResourceProperties('AWS::DynamoDB::Table',
    {
      Tags: tagCaptureDynamodb
    });

  expect(tagsCaptureLambda.asArray()).toEqual(tagCaptureDynamodb.asArray());

  expect(tagsCaptureLambda.asArray().at(0).Value).toEqual('todo-service');
  expect(tagsCaptureLambda.asArray().at(0).Key).toEqual("microservice");
});
