import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { TagsDemoStack_1, TagsDemoStack_2 } from '../lib/tags/TagsDemoStack';


//demo: Match.objectEquals
test('snapshot test', () => {
  const app = new cdk.App();
//  const stack = new TagsDemoStack_1(app, 'TagsDemoStack-test');
  const stack = new TagsDemoStack_2(app, 'TagsDemoStack-test');
  const template = Template.fromStack(stack);

  expect(template).toMatchSnapshot('snapshot-stack-1');
});
