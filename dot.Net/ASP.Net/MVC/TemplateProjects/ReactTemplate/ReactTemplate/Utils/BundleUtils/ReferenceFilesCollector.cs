using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using ReactTemplate.Utils.BundleUtils.Filters;
using FileInfo = ReactTemplate.Utils.BundleUtils.Filters.FileInfo;

namespace ReactTemplate.Utils.BundleUtils
{
    public class ReferenceFilesCollector
    {
        private readonly HashSet<string> _includedFiles;
        private readonly FileFilter _filter;

        public ReferenceFilesCollector(HashSet<string> includedFiles, FileFilter filter = null)
        {
            _includedFiles = includedFiles;
            _filter = filter;
        } 

        private static readonly Regex _referenceRegExp = new Regex(@"^\s*\/\/\/\s*<\s*reference\s*path\s*=\s*[""'](.*?)?['""]", RegexOptions.Multiline | RegexOptions.Compiled);

        private void includeFile(ICollection<string> newIncludedFiles, FileInfo fileInfo)
        {
            if (!filter(fileInfo)) return;

            fileInfo.Flush();
            var fileContent = fileInfo.Content;
            fileInfo.Content = null; //очищаем память
            if (fileContent == null) return;

            Match match = _referenceRegExp.Match(fileContent);
            while (match.Success)
            {
                var referencePath = match.Groups[1].Value;
                referencePath = VirtualPathUtility.Combine(fileInfo.VirtualPath, referencePath);
                referencePath = referencePath.Trim();
                var referenceFileInfo = new FileInfo(referencePath, fileInfo.Encoding);
                includeFile(newIncludedFiles, referenceFileInfo);
                match = match.NextMatch();
            }
            newIncludedFiles.Add(fileInfo.VirtualPath);
            _includedFiles.Add(fileInfo.VirtualPath);
        }

        private bool filter(FileInfo fileInfo)
        {
            if (String.IsNullOrEmpty(fileInfo.VirtualPath)) return false;
            if (_includedFiles.Contains(fileInfo.VirtualPath)) return false;
            var result = (_filter == null) || _filter(fileInfo);
            return result;
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
                includeFile(newIncludedFiles, new FileInfo(virtualPath, encoding));
            }
            return newIncludedFiles;
        }
    }
}
