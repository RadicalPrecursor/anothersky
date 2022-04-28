## Introduction
A project to generate random skies full of stars, from which constellations can be drawn.

## Architecture
    * Front End in JavaScript/React hosted with AWS Amplify
    * Requests go through AWS API Gateway
    * API requests handled by AWS Lambda Funtion (Python)
    * Lambda function interacts with DynamoDB
    * Lambda function sends data back

Architecture decisions were largely driven by a desire to get experience using AWS.

## Issues/To-do
### Issues - 2022-04-28:
    * Toggling out of active state on UI buttons requires hitting a specific button, not just clicking away
    * Layout behaves poorly at smaller screen sizes/resolutions
    * No checking for name collisions; currently will just rewrite, losing old data

### To-do:
    * Explore CI tools
    * Proper error handling on back-end
    * Rigorous testing

### Next Features:
    * Canvas drawing

## History
Was developing a drawing component for my organic chemistry nomenclature game, and this popped into my head as a project that could use a lot of the same techniques but be a little less overwhelming.  It turns out, making a whole game is difficult.  Who knew.

Did a quick static mock-up a while back using p5.js where I had fun tweaking parameters to make something that actually looks like a plausible sky full of stars.

Current iteration allows for starscapes to be generated, named, saved, and retrieved by name.
