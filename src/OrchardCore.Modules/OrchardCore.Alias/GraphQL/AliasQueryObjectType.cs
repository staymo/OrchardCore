using GraphQL.Types;
using Microsoft.Extensions.Localization;
using OrchardCore.Alias.Models;
using OrchardCore.ContentManagement.GraphQL.Queries.Types;

namespace OrchardCore.Alias.GraphQL
{
    public class AliasQueryObjectType : ObjectGraphType<AliasPart>
    {
        public AliasQueryObjectType(IStringLocalizer<AliasQueryObjectType> T)
        {
            Name = "AliasPart";
            Description = T["Alternative path for the content item"];

            Field("alias", x => x.Alias, true);

            Interface<ContentPartInterface>();
        }
    }
}
