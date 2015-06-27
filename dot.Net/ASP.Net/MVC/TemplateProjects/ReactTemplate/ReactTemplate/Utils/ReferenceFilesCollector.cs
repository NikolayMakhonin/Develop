using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;

namespace ReactTemplate.Utils
{
    public class ReferenceFilesCollector
    {
        private readonly HashSet<string> _includedFiles;
        private readonly Func<string, string> _filter;

        public ReferenceFilesCollector(HashSet<string> includedFiles, Func<string, string> filter = null)
        {
            _includedFiles = includedFiles;
            _filter = filter;
        } 

        private static readonly Regex _referenceRegExp = new Regex(@"^\s*\/\/\/\s*<\s*reference\s*path\s*=\s*[""'](.*?)?['""]", RegexOptions.Multiline | RegexOptions.Compiled);

        private void includeFile(ICollection<string> newIncludedFiles, string virtualPath, Encoding encoding)
        {
            var filePath = HttpContext.Current.Server.MapPath(virtualPath);

            if (!File.Exists(filePath))
            { 
                Debug.WriteLine("ReferenceFilesCollector: File not found: " + filePath);
                return;
            }

            string fileContent;

            try
            {
                fileContent = File.ReadAllText(filePath, encoding);
            }
            catch (Exception exception)
            {
                Debug.WriteLine("ReferenceFilesCollector: Read file error: " + filePath);
                Debug.WriteLine(exception.ToString());
                return;
            }

            Match match = _referenceRegExp.Match(fileContent);
            while (match.Success)
            {
                var referencePath = match.Groups[1].Value;
                referencePath = VirtualPathUtility.Combine(virtualPath, referencePath);
                referencePath = referencePath.Trim();
                referencePath = filter(referencePath);
                if (referencePath != null)
                {
                    includeFile(newIncludedFiles, referencePath, encoding);
                }
                match = match.NextMatch();
            }
            newIncludedFiles.Add(virtualPath);
            _includedFiles.Add(virtualPath);
        }

        private string filter(string filePath)
        {
            if (String.IsNullOrEmpty(filePath)) return null;
            if (_includedFiles.Contains(filePath)) return null;
            if (equalsSuffix(filePath, ".d.ts")) return null;
            filePath = replaceSuffix(filePath, ".ts", ".js");
            if (_filter != null && !String.IsNullOrEmpty(filePath)) filePath = _filter(filePath);
            return filePath;
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

        /// <returns>New included file paths</returns>
        public IEnumerable<string> IncludeFiles(params string[] filePaths)
        {
            return IncludeFiles(filePaths, null);
        }

        /// <param name="encoding">Encoding of reference line in file. Default: Encoding.UTF8</param>
        public IEnumerable<string> IncludeFiles(string[] virtualPaths, Encoding encoding)
        {
            var newIncludedFiles = new List<string>();
            foreach (var virtualPath in virtualPaths)
            {
                includeFile(newIncludedFiles, virtualPath, encoding ?? Encoding.UTF8);
            }
            return newIncludedFiles;
        }
    }
}
