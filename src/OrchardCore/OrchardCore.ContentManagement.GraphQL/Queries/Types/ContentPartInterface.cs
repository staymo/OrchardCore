using GraphQL.Types;

namespace OrchardCore.ContentManagement.GraphQL.Queries.Types
{
    public class ContentPartInterface : InterfaceGraphType<ContentPart>
    {
        public ContentPartInterface()
        {
            Name = "ContentPart";
        }
    }
}