# SpanishEnglishDemarcation
Smarter Balanced App providing tool for studying possible options for spanish to english demarcation. This app is intended to be used for the duration of the study.

## Environment
This project is intended to be run on a windows machine using Dotnet core and vs code. However, it is possible to run development of this application on Mac and Linux.

## Set up

### Prerequisites
Before running this project you will need to ensure you have installed the following dependencies:
- Dotnet core SKD
- Dotnet core CLI
- VS Code

### Install Dependencies
Before running the project we need to make sure that we have the dependencies installed. 
```
> dotnot restore
```
This command will install all the dependencies needed to run the project.

### Running the project
To run the to run the project we first need to make sure that we build the project.
```
dotnet build
```
Next we can run the project:
```
dotnet run
```

### Running the project Via VS Code
It is also possible to run the project via VS code. To do this go to the debug menu. Once at the debug menu use the drop down to select .netcore launch. Then should be able to press the play button and the application will launch. Doing this will also eliminate the need to build the project and run the dotnet restore.


## Deployment
This application is deployed in a docker container. To prepare the application for deployment run the following commands:
```
docker build -t {desired tag} .
docker push {desired tag}
```
This will build the image and push it to docker hub. If you want to ensure that the image you have built runs use the following command.
```
docker run -p 8000:80 {desired tag}
```
