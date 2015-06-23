using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(SchoolWebSite.Startup))]
namespace SchoolWebSite
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
