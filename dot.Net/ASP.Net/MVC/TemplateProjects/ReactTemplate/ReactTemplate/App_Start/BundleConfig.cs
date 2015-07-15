using System.Web.Optimization;
using AspNetUtils.BundleUtils;
using AspNetUtils.BundleUtils.Filters;
using ReactTemplate.Utils.BundleUtils.Filters;

namespace ReactTemplate
{
    public class BundleConfig
    {
        // Дополнительные сведения об объединении см. по адресу: http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/js/vendors").Include(
                "~/Scripts/jquery-{version}.js",
                "~/Scripts/bootstrap.js"));

            bundles.Add(new ScriptBundleExt("~/bundles/js/react").Include(
                "~/Scripts/react.js"
                ));

            bundles.Add(new ScriptBundleExt("~/bundles/js/utils").Include(
                "~/Scripts/TypeScriptUtils.js"
                )); 
            
            bundles.Add(new ScriptBundleExt("~/bundles/js/app").IncludeWithReferences(
                new FileFilterCollection(JavaScriptFilters.TypeScriptFilter).Filter,
                "~/Scripts/app/client/app.ts"));

            bundles.Add(new StyleBundle("~/bundles/css/vendors").Include(
                 "~/Content/bootstrap.css",
                 "~/Content/Site.css"));
        }
    }
}
