using System;
using System.Collections.Generic;
using System.Text;
using System.Web.Optimization;

namespace ReactTemplate.Utils
{
    public class ScriptBundleExt : ScriptBundle
    {
        private readonly HashSet<string> _includedFiles;

        public ScriptBundleExt(string virtualPath) : base(virtualPath)
        {
            _includedFiles = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        }

        public ScriptBundleExt(string virtualPath, string cdnPath)
            : base(virtualPath, cdnPath)
        {
        }

        public Bundle IncludeWithReferences(params string[] virtualPaths)
        {
            return IncludeWithReferences(virtualPaths, null);
        }   

        /// <param name="encoding">Default UTF8</param>
        public Bundle IncludeWithReferences(string[] virtualPaths, Func<string, string> filter, Encoding encoding = null)
        {
            var mustIncludeFiles = new ReferenceFilesCollector(_includedFiles).IncludeFiles(virtualPaths, encoding);
            foreach (var virtualPath in mustIncludeFiles)
            {
                base.Include(virtualPath);
            }
            return this;
        }

        public new ScriptBundleExt Include(params string[] virtualPaths)
        {
            base.Include(virtualPaths);
            return this;
        }

        public new ScriptBundleExt Include(string virtualPath, params IItemTransform[] transforms)
        {
            base.Include(virtualPath, transforms);
            return this;
        }

        public new ScriptBundleExt IncludeDirectory(string directoryVirtualPath, string searchPattern)
        {
            base.IncludeDirectory(directoryVirtualPath, searchPattern);
            return this;
        }

        public new ScriptBundleExt IncludeDirectory(string directoryVirtualPath, string searchPattern, bool searchSubdirectories)
        {
            base.IncludeDirectory(directoryVirtualPath, searchPattern, searchSubdirectories);
            return this;
        }
    }
}
