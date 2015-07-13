using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AspNetUtils.Debug;
using SchoolDataLayer.EntityModel;

namespace ReactTemplate.Models
{
    public static class SchoolEntitiesSingleton
    {
        private static SchoolEntities _instance;

        private static SchoolEntities createInstance()
        {
            var model = new SchoolEntities();
            model.Database.Log = EntityFrameworkLogger.Log;
            return model;
        }

        public static SchoolEntities Instance
        {
            get { return _instance ?? (_instance = createInstance()); }
        }
    }
}
