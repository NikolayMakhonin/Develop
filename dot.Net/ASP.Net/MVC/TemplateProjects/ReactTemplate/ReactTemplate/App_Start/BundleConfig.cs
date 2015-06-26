using System.Web.Optimization;

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

            bundles.Add(new ScriptBundle("~/bundles/js/react").Include(
                "~/Scripts/react/react-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/js/app").Include(
                ));

            bundles.Add(new StyleBundle("~/bundles/css/vendors").Include(
                 "~/Content/bootstrap.css"));
        }
    }
}
