import * as cdk from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { TagsDemoStack_1 } from '../lib/tags/TagsDemoStack';


//demo: Match.objectEquals
test('match test', () => {
  const app = new cdk.App();
  const stack = new TagsDemoStack_1(app, 'TagsDemoStack-test');
  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::Lambda::Function', Match.objectEquals(
    {
      Runtime: "nodejs18.x",
      Tags: [
        {
          "Key": "microservice",
          "Value": "todo-service"
        }
      ],
      Code: Match.anyValue(),
      Handler: Match.anyValue(),
      Role: Match.anyValue(),
    }));


  template.hasResourceProperties('AWS::Lambda::Function',
    {
      Runtime: "nodejs18.x",
      Tags: Match.arrayEquals([
        {
          "Key": "microservice",
          "Value": "todo-service"
        }
      ])
    });


});
