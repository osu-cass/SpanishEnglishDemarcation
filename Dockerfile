FROM microsoft/aspnetcore-build:2.0 AS build-env

# Copy csproj and restore as distinct layers
COPY . /app
WORKDIR /app
RUN dotnet restore
RUN dotnet publish -c Release -o out

# Build runtime image
FROM microsoft/aspnetcore:2.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "SmarterBalanced.SpanishEnglishDemarcation.dll"]