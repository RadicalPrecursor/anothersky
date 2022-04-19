##
A project to generate random skies full of stars, from which constellations can be drawn.

## Architecture
    Front End (this here) hosted on AWS Amplify
    Requests go through AWS API Gateway
    API requests handled by AWS Lambda Funtion
    Lambda function interacts with DynamoDB
    Lambda function sends data back

## To-Do/Issues
Well for one, there's no interactivity in the canvas yet.

2022-03-28:
    ** Currently lambda function is a bare-bones python script just stored on AWS.
    ** Whole front-end is janky and weird.
    ** Still trying to get the hang of when React loads things, would like a random starscape to load automatically.
    ** Get interactivity for the stars.
        In previous iteration of project a lot of extra data relevant to interactivity had been stored in the class, but isn't information that makes sense to store in database.
    ** No testing, figure out how to do that.  I have stuff to read on how that tends to be done, no idea how complicated that will be in practice.

## History
Was developing a drawing component for my organic chemistry nomenclature game, and this popped into my head as a project that could use a lot of the same techniques but be a little less overwhelming.  It turns out, making a whole game is difficult.  Who knew.

Did a quick static mock-up a while back using p5.js where I had fun tweaking parameters to make something that actually looks like a plausible sky full of stars.
