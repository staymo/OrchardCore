FROM mcr.microsoft.com/dotnet/core/aspnet:2.2-stretch-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:2.2-stretch AS publish
WORKDIR /
#分别复制，需要publish.ps1的配合。事先把不同的文件分别放在不同的路径下，然后再分别COPY
#可以更好地利用Docker的Layer机制
COPY ./src/OrchardCore.Cms.Web/build/release/*.* /app/
COPY ./src/OrchardCore.Cms.Web/build/release/mdlls/*.* /app/
COPY ./src/OrchardCore.Cms.Web/build/release/ndlls/*.* /app/
COPY ./src/OrchardCore.Cms.Web/build/release/odlls/*.* /app/
COPY ./src/OrchardCore.Cms.Web/build/release/sdlls/*.* /app/
COPY ./src/OrchardCore.Cms.Web/build/release/ydlls/*.* /app/
COPY ./src/OrchardCore.Cms.Web/build/release/ocdlls/*.* /app/
COPY ./src/OrchardCore.Cms.Web/build/release/thedlls/*.* /app/
COPY ./src/OrchardCore.Cms.Web/build/release/occmsweb/*.* /app/
COPY ./src/OrchardCore.Cms.Web/build/release/App_Data /app/App_Data
COPY ./src/OrchardCore.Cms.Web/build/release/runtimes /app/runtimes
COPY ./src/OrchardCore.Cms.Web/build/release/wwwroot /app/wwwroot

#全部复制
#COPY ./src/OrchardCore.Cms.Web/build/release /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENV ASPNETCORE_URLS=http://+:17000
ENTRYPOINT ["dotnet", "OrchardCore.Cms.Web.dll"]
