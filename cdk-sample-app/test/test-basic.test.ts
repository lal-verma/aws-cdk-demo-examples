import * as cdk from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { TagsDemoStack_1 } from '../lib/tags/TagsDemoStack';


// demo: testing with hasProperties
test('basic test', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new TagsDemoStack_1(app, 'TagsDemoStack-test');
  // THEN
  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::Lambda::Function', {
      Runtime: "nodejs18.x",      
      Tags: [
        {
          "Key": "incorrect-key",
          "Value": "incorrect-value"
        }
      ],
    });


});
