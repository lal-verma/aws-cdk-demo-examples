import * as cdk from 'aws-cdk-lib';

export class RuntimeEnvironment  {
    vpcId: string;
    asgMin: number;
    asgMax: number;
    asgDesired: number;
    constructor(stack: cdk.Stack) {  
        //fetching env (context) passed from command line
        const env = stack.node.tryGetContext('env');
        console.log(`env value from command line: ${env}`);

        const envConfig = stack.node.tryGetContext(env);
        console.log(`configured parameters : ${envConfig}`);
        if (!envConfig)
            throw new Error(`Invalid environment name: ${env}`);
        this.vpcId = envConfig.vpcId;
        this.asgMin = envConfig.asgMin;
        this.asgMax = envConfig.asgMax;
        this.asgDesired = envConfig.asgDesired;    
    }
  }