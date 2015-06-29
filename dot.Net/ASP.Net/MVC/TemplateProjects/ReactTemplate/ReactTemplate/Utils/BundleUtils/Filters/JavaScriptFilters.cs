using System;
using System.Collections;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace ReactTemplate.Utils.BundleUtils.Filters
{
    public static class JavaScriptFilters
    {
        public static bool TypeScriptFilter(FileInfo fileInfo)
        {
            if (equalsSuffix(fileInfo.VirtualPath, ".d.ts")) return false;
            fileInfo.VirtualPath = replaceSuffix(fileInfo.VirtualPath, ".ts", ".js");
            return true;
        }

        private static Hashtable _jsxReplaceAttributeNames;
        private static Hashtable jsxReplaceAttributeNames
        {
            get
            {
                if (_jsxReplaceAttributeNames == null)
                {
                    _jsxReplaceAttributeNames = new Hashtable();
                    _jsxReplaceAttributeNames["class"] = "className";
                    _jsxReplaceAttributeNames["for"] = "htmlFor";
                }
                return _jsxReplaceAttributeNames;
            }
        }

        private static string replaceAttibute(Match match)
        {
            var attribute = match.Groups[2].Value;
            attribute = ((string)jsxReplaceAttributeNames[attribute]) ?? attribute;
            return match.Result("$1" + attribute  + "$3");
        }

        private static string correctJsxAttributes(Match match)
        {
            var html = match.Groups[1].Value;
            html = _JsxAttributeRegex.Replace(html, replaceAttibute);
            return html;
        }

        static readonly Regex _removeJsMapReference = new Regex(@"^\s*//#\s*sourceMappingURL\s*=.*", RegexOptions.Multiline | RegexOptions.Compiled);
        static readonly Regex _JsxAttributeRegex = new Regex(@"(\s+)(class|for)(\s*=)", RegexOptions.Singleline | RegexOptions.Compiled);
        static readonly Regex _jsToJsxRegex = new Regex(@"\(\s*function\s*\(\s*\)\s*\{\s*/\*\s*(<\w.*?>)\s*\*/\s*\}\s*\)", RegexOptions.Singleline | RegexOptions.Compiled);
        public static bool JsToJsxFilter(FileInfo fileInfo)
        {
            if (!equalsSuffix(fileInfo.VirtualPath, ".js")) return true;
            var content = fileInfo.Content;
            if (content == null) return false;
            var newContent = _jsToJsxRegex.Replace(content, correctJsxAttributes);
            if (newContent != content)
            {
                newContent = _removeJsMapReference.Replace(newContent, "");
                fileInfo.MoveTo(replaceSuffix(fileInfo.VirtualPath, ".js", ".jsx"));
                fileInfo.Content = newContent;
            }
            return true;
        }

        private static bool equalsSuffix(string filePath, string extension)
        {
            var extLen = extension.Length;
            return String.Compare(filePath, filePath.Length - extLen, extension, 0, extLen) == 0;
        }

        private static string replaceSuffix(string str, string search, string replace)
        {
            var extLen = search.Length;
            var index = str.Length - extLen;
            if (String.Compare(str, index, search, 0, extLen) == 0)
            {
                return str.Substring(0, index) + replace;
            }
            return str;
        }
    }
}