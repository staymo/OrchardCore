using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Nancy;
using Nancy.Owin;
using OrchardCore.Modules;
using OrchardCore.Nancy.AssemblyCatalogs;

namespace OrchardCore.Nancy
{
    public class Startup : StartupBase
    {
        public override int Order => -200;

        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddRouting();
        }

        public override void Configure(IApplicationBuilder app, IRouteBuilder routes, IServiceProvider serviceProvider)
        {
            var options = serviceProvider.GetService<IOptions<NancyOptions>>();

            app.UseOwin(x => x.UseNancy(no =>
            {
                no.Bootstrapper = new ModularNancyBootstrapper(
                    new[]
                    {
                        (IAssemblyCatalog)new DependencyContextAssemblyCatalog(),
                        (IAssemblyCatalog)new AmbientAssemblyCatalog()
                    });

                no.PerformPassThrough = options.Value.PerformPassThrough;
                no.EnableClientCertificates = options.Value.EnableClientCertificates;
            }));
        }
    }
}