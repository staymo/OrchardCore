FROM mcr.microsoft.com/dotnet/core/aspnet:2.2-stretch-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:2.2-stretch AS build
#下面各种花式COPY，基本上都玩烂了，但都还是没能在最后dotnet Restore成功。
WORKDIR /oc
COPY ./*.* ./
COPY ./.* ./
WORKDIR /oc/src
COPY src/OrchardCore.Build/* ./OrchardCore.Build/
COPY src/OrchardCore/*/*.csproj ./
RUN for file in $(ls *.csproj); do mkdir -p ./OrchardCore/${file%.*}/ && mv $file ./OrchardCore/${file%.*}/; done
COPY src/OrchardCore.Modules/*/*.csproj ./
RUN for file in $(ls *.csproj); do mkdir -p ./OrchardCore.Modules/${file%.*}/ && mv $file ./OrchardCore.Modules/${file%.*}/; done
COPY src/OrchardCore.Themes/*/*.csproj ./
RUN for file in $(ls *.csproj); do mkdir -p ./OrchardCore.Themes/${file%.*}/ && mv $file ./OrchardCore.Themes/${file%.*}/; done
COPY src/OrchardCore.Themes/*/*.csproj ./
RUN for file in $(ls *.csproj); do mkdir -p ./OrchardCore.Themes/${file%.*}/ && mv $file ./OrchardCore.Themes/${file%.*}/; done
COPY src/Templates/*/*.csproj ./
RUN for file in $(ls *.csproj); do mkdir -p ./Templates/${file%.*}/ && mv $file ./Templates/${file%.*}/; done
COPY src/*/*.csproj ./
RUN for file in $(ls *.csproj); do mkdir -p ./${file%.*}/ && mv $file ./${file%.*}/; done
WORKDIR /oc/test
COPY test/*/*.csproj ./
RUN for file in $(ls *.csproj); do mkdir -p ./${file%.*}/ && mv $file ./${file%.*}/; done
COPY test/OrchardCore.Tests.Modules/*/*.csproj ./
RUN for file in $(ls *.csproj); do mkdir -p ./OrchardCore.Tests.Modules/${file%.*}/ && mv $file ./OrchardCore.Tests.Modules/${file%.*}/; done
COPY test/OrchardCore.Tests.Pages/*/*.csproj ./
RUN for file in $(ls *.csproj); do mkdir -p ./OrchardCore.Tests.Pages/${file%.*}/ && mv $file ./OrchardCore.Tests.Pages/${file%.*}/; done
COPY test/OrchardCore.Tests.Pages/OrchardCore.Modules.Pages/*/*.csproj ./
RUN for file in $(ls *.csproj); do mkdir -p ./OrchardCore.Tests.Pages/OrchardCore.Modules.Pages/${file%.*}/ && mv $file ./OrchardCore.Tests.Pages/OrchardCore.Modules.Pages/${file%.*}/; done
COPY test/OrchardCore.Tests.Pages/OrchardCore.Modules.Pages/Directory.Build.* ./OrchardCore.Tests.Pages/OrchardCore.Modules.Pages/
COPY test/OrchardCore.Tests.Pages/OrchardCore.Themes.Pages/*/*.csproj ./
RUN for file in $(ls *.csproj); do mkdir -p ./OrchardCore.Tests.Pages/OrchardCore.Themes.Pages/${file%.*}/ && mv $file ./OrchardCore.Tests.Pages/OrchardCore.Themes.Pages/${file%.*}/; done
COPY test/OrchardCore.Tests.Pages/OrchardCore.Themes.Pages/Directory.Build.* ./OrchardCore.Tests.Pages/OrchardCore.Themes.Pages/


#RUN dotnet restore "OrchardCore.Cms.Web/OrchardCore.Cms.Web.csproj"

#WORKDIR /oc
#COPY . .
#WORKDIR "/oc/src/OrchardCore.Cms.Web"
#RUN dotnet build "OrchardCore.Cms.Web.csproj" -c Release -o /app
#
#FROM build AS publish
#RUN dotnet publish "OrchardCore.Cms.Web.csproj" -c Release -o /app
#
#FROM base AS final
#WORKDIR /app
#COPY --from=publish /app .
#ENTRYPOINT ["dotnet", "OrchardCore.Cms.Web.dll"]
