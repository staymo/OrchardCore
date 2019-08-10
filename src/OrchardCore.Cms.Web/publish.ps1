Remove-Item -path build -recurse -Force
dotnet publish -c Release -o build/release
mkdir -p ./build/release/occmsweb
Move-Item -Path ./build/release/OrchardCore.Cms.Web.* -Destination ./build/release/occmsweb
mkdir -p ./build/release/ocdlls
Move-Item -Path ./build/release/OrchardCore*.dll -Destination ./build/release/ocdlls
mkdir -p ./build/release/mdlls
Move-Item -Path ./build/release/M*.dll -Destination ./build/release/mdlls
mkdir -p ./build/release/ndlls
Move-Item -Path ./build/release/N*.dll -Destination ./build/release/ndlls
mkdir -p ./build/release/odlls
Move-Item -Path ./build/release/O*.dll -Destination ./build/release/odlls
mkdir -p ./build/release/sdlls
Move-Item -Path ./build/release/S*.dll -Destination ./build/release/sdlls
mkdir -p ./build/release/ydlls
Move-Item -Path ./build/release/Y*.dll -Destination ./build/release/ydlls
mkdir -p ./build/release/thedlls
Move-Item -Path ./build/release/The*.dll -Destination ./build/release/thedlls
Write-Host "Clear App_Data"
Remove-Item build/release/App_Data/* -recurse
Write-Host "docker-compose:"
docker-compose -f ../../docker-compose.yml -f ../../docker-compose.staging.yml build
Write-Host "compose completed."
