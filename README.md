# AI Recipe Generator

A full-stack serverless generative AI application that creates recipes from ingredients supplied by the user. The application uses React for the frontend and AWS Amplify Gen 2, AWS AppSync, Amazon Cognito, and Amazon Bedrock for the cloud backend.

## Live Application

[Launch the AI Recipe Generator](https://main.dv8rdp4oqrd6c.amplifyapp.com)

## Project Overview

The AI Recipe Generator allows users to enter ingredients such as:

```text
chicken, cheese, bread

The application sends the ingredients through an AWS AppSync GraphQL query to Amazon Bedrock. Amazon Nova Lite processes the request and returns a generated recipe to the React interface.

Features
Generates recipes from user-provided ingredients
Responsive React and TypeScript interface
Generative AI powered by Amazon Bedrock
GraphQL API provided by AWS AppSync
Authentication resources managed through Amazon Cognito
Infrastructure defined with AWS Amplify Gen 2
Automated builds and deployments from GitHub
HTTPS-enabled public hosting through AWS Amplify Hosting



| Service             | Purpose                                                    |
| ------------------- | ---------------------------------------------------------- |
| AWS Amplify Hosting | Builds, deploys, and hosts the React application           |
| AWS Amplify Gen 2   | Defines and deploys backend resources using TypeScript     |
| AWS AppSync         | Provides the GraphQL API and custom resolver               |
| Amazon Bedrock      | Provides access to the generative AI model                 |
| Amazon Nova Lite    | Generates recipes from the submitted ingredients           |
| Amazon Cognito      | Provides user authentication resources                     |
| AWS IAM             | Controls permissions between Amplify, AppSync, and Bedrock |
| AWS CloudFormation  | Provisions and manages backend infrastructure              |


Technology Stack
React
TypeScript
Vite
Node.js
AWS Amplify Gen 2
AWS AppSync
Amazon Bedrock
Amazon Nova Lite
Amazon Cognito
GitHub
YAML

Project Structure
ai-recipe-generator/
├── amplify/
│   ├── auth/
│   │   └── resource.ts
│   ├── data/
│   │   ├── bedrock.js
│   │   └── resource.ts
│   └── backend.ts
├── public/
├── src/
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── amplify_outputs.json
├── package.json
├── package-lock.json
├── tsconfig.json
└── vite.config.ts

amplify_outputs.json is generated for the appropriate Amplify environment and contains the configuration the frontend uses to connect to AWS resources.

Local Development

Prerequisites
Install or configure the following:

Node.js
npm
Git
AWS account
AWS CLI
AWS credentials with appropriate Amplify development permissions

Clone the Repository
git clone https://github.com/Gees1902/ai-recipe-generator.git
cd ai-recipe-generator

Install Dependencies
npm install

Start the Amplify Sandbox
Run this command in one terminal:
npx ampx sandbox

The sandbox deploys an isolated development backend and generates the local amplify_outputs.json file.
Start the Development Server
Open another terminal and run:
npm run dev

Open the local URL displayed by Vite, usually:
http://localhost:5173

Create a Production Build
npm run build

Amplify Build Configuration
The production pipeline deploys the backend before building the frontend. This generates the production amplify_outputs.json file required by the React application.

version: 1
backend:
  phases:
    build:
      commands:
        - npm install --cache .npm --prefer-offline
        - npx ampx pipeline-deploy --branch $AWS_BRANCH --app-id $AWS_APP_ID
frontend:
  phases:
    preBuild:
      commands:
        - npm install --cache .npm --prefer-offline
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - .npm/**/*


## Deployment Workflow
-Source code is pushed to the GitHub main branch.
-AWS Amplify detects the commit.
-Amplify installs the project dependencies.
-ampx pipeline-deploy deploys the backend resources.
-Amplify generates the production configuration.
-Vite creates the production frontend bundle.
-Amplify publishes the application to its HTTPS URL.


Challenges and Resolutions
Git Push Rejected

The remote repository initially contained changes that were not available locally. The remote and local Git histories had to be synchronized before the application could be pushed successfully.

Package Lock File Conflict
Amplify initially used npm ci, but the dependency information in package.json and package-lock.json was not synchronized for the cloud environment.

The build configuration was updated to use:
npm install --cache .npm --prefer-offline

Missing amplify_outputs.json
The frontend build failed with:
Cannot find module '../amplify_outputs.json'

The original build configuration deployed only the frontend. A backend build phase was added:
npx ampx pipeline-deploy --branch $AWS_BRANCH --app-id $AWS_APP_ID


This command deploys the backend and generates the production configuration file before the frontend is compiled.

IAM Access Denied
The Amplify build initially lacked permission to read the CDK bootstrap parameter from AWS Systems Manager Parameter Store.

The issue was resolved by creating an Amplify – Backend Deployment service role and assigning it to the Amplify application.

Retired Bedrock Model
The model originally used by the tutorial had reached its end of life. The application was updated to use:
amazon.nova-lite-v1:0

The resolver request and response formats were also updated to support the Amazon Nova API structure.

Security Considerations
Backend deployment permissions are assigned through a dedicated IAM service role.
AppSync receives only the permissions required to invoke the configured Bedrock model.
AWS credentials are not stored in the frontend source code.
HTTPS is provided by AWS Amplify Hosting.
Public usage should be monitored to prevent unexpected AI-service charges.
Authentication, request throttling, AWS Budgets, and CloudWatch monitoring should be enabled before large-scale public use.
Future Enhancements
Add a complete sign-up and sign-in experience
Add dietary preference selections
Support allergies and excluded ingredients
Display preparation and cooking times
Format ingredients and instructions into separate sections
Save favorite recipes
Add recipe history
Add request throttling and usage quotas
Add CloudWatch monitoring and alarms
Configure a custom domain


What I Learned

This project provided hands-on experience with:

Building a React and TypeScript application
Integrating a frontend with a GraphQL API
Calling Amazon Bedrock through a custom AppSync resolver
Updating an application when an AI model reaches end of life
Managing cloud permissions with AWS IAM
Troubleshooting CI/CD dependency and build failures
Deploying frontend and backend resources through Amplify Gen 2
Using GitHub as the source for automated cloud deployments


Author
Gloria Page

Cloud Security, Cybersecurity, AWS Cloud Engineering, AI, and GRC

GitHub: Gees1902
Website: BigTechGirls.com


Disclaimer
This project was created for educational and portfolio purposes. AI-generated recipes should be reviewed for food safety, allergies, dietary restrictions, and proper cooking temperatures before use.