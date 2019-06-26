using GraphQL.Types;
using OrchardCore.ContentManagement.GraphQL.Queries.Types;
using OrchardCore.Forms.Models;

namespace OrchardCore.Forms.GraphQL
{
    public class ValidationSummaryPartQueryObjectType : ObjectGraphType<ValidationSummaryPart>
    {
        public ValidationSummaryPartQueryObjectType()
        {
            Name = "ValidationSummaryPart";

            Interface<ContentPartInterface>();
        }
    }
}