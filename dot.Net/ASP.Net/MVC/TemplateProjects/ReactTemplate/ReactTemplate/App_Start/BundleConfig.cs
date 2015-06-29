using System.Web.Optimization;
using ReactTemplate.Utils;
using ReactTemplate.Utils.BundleUtils;
using ReactTemplate.Utils.BundleUtils.Filters;

namespace ReactTemplate
{
    public class BundleConfig
    {
        // Дополнительные сведения об объединении см. по адресу: http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/js/vendors").Include(
                "~/Scripts/TypeScriptUtils.js",
                "~/Scripts/jquery-{version}.js",
                "~/Scripts/bootstrap.js"));

            bundles.Add(new ScriptBundleExt("~/bundles/js/react").Include(
                "~/Scripts/react/react-{version}.js").IncludeWithReferences(
                "~/Scripts/react/flux/index.js"
                ));

            bundles.Add(new ScriptBundleExt("~/bundles/js/app").IncludeWithReferences(
                new FileFilterCollection(JavaScriptFilters.TypeScriptFilter, JavaScriptFilters.JsToJsxFilter).Filter,
                "~/Scripts/App/App.ts"));

            bundles.Add(new StyleBundle("~/bundles/css/vendors").Include(
                 "~/Content/bootstrap.css",
                 "~/Content/Site.css"));
        }
    }
}
