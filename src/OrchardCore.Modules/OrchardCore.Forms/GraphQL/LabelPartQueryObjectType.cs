using GraphQL.Types;
using OrchardCore.ContentManagement.GraphQL.Queries.Types;
using OrchardCore.Forms.Models;

namespace OrchardCore.Forms.GraphQL
{
    public class LabelPartQueryObjectType : ObjectGraphType<LabelPart>
    {
        public LabelPartQueryObjectType()
        {
            Name = "LabelPart";

            Field(x => x.For, nullable: true);
            Field<StringGraphType>("value", resolve: context => context.Source.ContentItem.DisplayText);

            Interface<ContentPartInterface>();
        }
    }
}