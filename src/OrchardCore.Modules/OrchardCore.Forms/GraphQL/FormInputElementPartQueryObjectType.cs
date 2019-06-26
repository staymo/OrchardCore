using GraphQL.Types;
using OrchardCore.ContentManagement.GraphQL.Queries.Types;
using OrchardCore.Forms.Models;

namespace OrchardCore.Forms.GraphQL
{
    public class FormInputElementPartQueryObjectType : ObjectGraphType<FormInputElementPart>
    {
        public FormInputElementPartQueryObjectType()
        {
            Name = "FormInputElementPart";

            Field(x => x.Name, nullable: true);

            Interface<ContentPartInterface>();
        }
    }
}