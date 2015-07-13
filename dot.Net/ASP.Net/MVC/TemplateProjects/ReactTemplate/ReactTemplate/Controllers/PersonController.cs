using System.Web.OData.Query;
using AspNetUtils.Controllers.OData;
using ReactTemplate.Models;
using SchoolDataLayer.EntityModel;

namespace ReactTemplate.Controllers
{
    /*
    Для класса WebApiConfig может понадобиться внесение дополнительных изменений, чтобы добавить маршрут в этот контроллер. Объедините эти инструкции в методе Register класса WebApiConfig соответствующим образом. Обратите внимание, что в URL-адресах OData учитывается регистр символов.

    using System.Web.Http.OData.Builder;
    using System.Web.Http.OData.Extensions;
    using ODataTest.Models;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<Rows>("Rows");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class PersonController : BaseODataController<SchoolEntities, Person, int>
    {
        private static readonly ODataValidationSettings _validationSettingsInstance = new ODataValidationSettings();

        static PersonController() 
        {
            _validationSettingsInstance.AllowedQueryOptions = AllowedQueryOptions.All;
        }

        public PersonController()
            : base(SchoolEntitiesSingleton.Instance, _validationSettingsInstance, SchoolEntitiesResolver.Instance)
        {
        }

    }
}
