using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Optimization;

namespace SchoolWebApi
{
    public class BundleConfig
    {
        // Дополнительные сведения об объединении см. по адресу: http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/vendors").Include(
                "~/Scripts/jquery-{version}.js",
                "~/Scripts/bootstrap.js",
                "~/Scripts/react/react-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                 "~/Content/bootstrap.css"));
        }
    }
}
