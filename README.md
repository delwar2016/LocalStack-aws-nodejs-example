# LocalStack with NodeJS and AWS SDK

## Overview
This repository contains a NodeJS script demonstrating the usage of LocalStack with the AWS SDK. LocalStack allows you to develop and test AWS applications locally.

## Prerequisites
- [Docker](https://www.docker.com/) installed on your machine
- NodeJS and npm installed
- AWS SDK for NodeJS (installed via `npm install aws-sdk`)

## Getting Started
1. Clone this repository.
2. Install dependencies: `npm install`
3. Start LocalStack using Docker: `docker run -d --name localstack_container -p 4566:4566 -e SERVICES=s3 -e DOCKER_HOST=unix:///var/run/docker.sock localstack/localstack`
4. Update AWS SDK configuration in your script with the local endpoint.

## Running the Script
Before running your script, make sure to create the bucket using the AWS CLI or SDK. Here's how you can create a bucket using the AWS CLI:
aws --endpoint-url=http://localhost:4566 s3 mb s3://my-local-bucket

Execute your NodeJS script using `node upload.js`.

## Example Use Case
The script in this repository uploads a file to LocalStack's simulated S3 bucket. Customize it according to your use case.

## Cleanup
Don't forget to stop and remove the LocalStack Docker container after testing: `docker stop localstack_container && docker rm localstack_container`

## Contributing
Feel free to contribute to this project. Open issues, submit pull requests, and share your experiences with LocalStack!

## License
This project is licensed under the [MIT License](LICENSE).
