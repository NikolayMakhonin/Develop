using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace SchoolWebSite.Helpers
{
    public static class SimpleHelpers
    {
        public static MvcHtmlString SeparatedList<T>(this HtmlHelper html, IEnumerable<T> list, Func<T, IHtmlString> format, IHtmlString separator = null)
        {
            var sb = new StringBuilder();
            foreach (T item in list)
            {
                if (separator != null && sb.Length > 0) sb.Append(separator);
                var text = (format == null)
                    ? (item == null ? null : item.ToString())
                    : format(item).ToString();
                if (text != null) sb.Append(text);
            }
            return new MvcHtmlString(sb.ToString());
        }
    }
}
