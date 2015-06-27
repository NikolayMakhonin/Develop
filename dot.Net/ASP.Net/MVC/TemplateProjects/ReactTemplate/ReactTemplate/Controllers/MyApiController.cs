using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;
using System.Web.Http.Results;
using System.Web.Mvc;
using Newtonsoft.Json;

namespace ReactTemplate.Controllers
{
    public class MyApiController : ApiController
    {
        public HttpResponseMessage getText()
        {
            var obj = new {name = "Api name"};
            return new HttpResponseMessage { Content = new ObjectContent(obj.GetType(), obj, new JsonMediaTypeFormatter()) };
        }
    }
}
