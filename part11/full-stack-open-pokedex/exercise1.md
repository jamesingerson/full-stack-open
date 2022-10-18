Language: C#

Addressing the common CI steps:
Linting: If using Visual Studio (2019 or later), EditorConfig files in the repository will override IDE settings and enforce project level styling. This choice has the added perk of putting style guidelines in the repository, making consistency across developers before deployment easier.
Testing: MSTest Unit Test Projects can be added to the solution. Alternatively xUnit or NUnit. Playwright offers integration testing through browser emulation.
Building: Configuration file defined behaviour upon calling dotnet build. Under the hood it leverages MSBuild.

Alternate CI options include:

- GitLab CI/Runner, an alternative to  Github with cloud SaaS and self hosted options.
- Atlassian Bamboo, a selfhosted, annually licensed option.
- JetBrains TeamCity, cloud or selfhosted. 
- AWS CodePipeline, Amazon's cloud offering.
- Azure DevOps Server/Azure Pipelines, Microsoft's cloud offering.
- GCP GKE with Cloud Build, Google's cloud offering. Leverages the Google Kubernetes Engine.
- Concourse CI, an open source option.
- Drone, cloud or self hosted with enterprise support options.

These options cover a range of cloud and self hosted. Across a number of different platforms and providers.

The hypothetical C# application could be either self-hosted or cloud-based. We'd probably like to know the audience of the application (internal staff or global), security/auditing requirements, and preferred business expenditure method (captial vs operational). Business requirements could eliminate a number of choices. Ideally we'd leverage a technology they or we are already familiar with. 