using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Optimization;

namespace GeoBase
{
    public class BundleConfig
    {
        // Дополнительные сведения об объединении см. по адресу: http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/knockout").Include(
                "~/Scripts/knockout-{version}.js",
                "~/Scripts/knockout.validation.js"));

            bundles.Add(new ScriptBundle("~/bundles/app/base").Include(
                "~/Scripts/app/base/ajaxPrefilters.js",
                "~/Scripts/app/base/datamodel.js",
                "~/Scripts/app/base/viewmodel.js"));

            bundles.Add(new ScriptBundle("~/bundles/app/account").Include(
                "~/Scripts/app/account/_datamodel.js",
                "~/Scripts/app/account/_viewmodel.js",
                "~/Scripts/app/account/home.viewmodel.js",
                "~/Scripts/app/account/login.viewmodel.js",
                "~/Scripts/app/account/register.viewmodel.js",
                "~/Scripts/app/account/registerExternal.viewmodel.js",
                "~/Scripts/app/account/manage.viewmodel.js",
                "~/Scripts/app/account/userInfo.viewmodel.js"));

            bundles.Add(new ScriptBundle("~/bundles/app/geo").Include(
                "~/Scripts/app/geo/_datamodel.js",
                "~/Scripts/app/geo/_viewmodel.js"));


            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                "~/Scripts/app/_run.js"));

            // Используйте версию Modernizr для разработчиков, чтобы учиться работать. Когда вы будете готовы перейти к работе,
            // используйте средство построения на сайте http://modernizr.com, чтобы выбрать только нужные тесты.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                "~/Scripts/bootstrap.js",
                "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                 "~/Content/bootstrap.css",
                 "~/Content/Site.css"));
        }
    }
}
