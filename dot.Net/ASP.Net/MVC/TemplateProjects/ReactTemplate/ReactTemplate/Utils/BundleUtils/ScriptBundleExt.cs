using System;
using System.Collections.Generic;
using System.Text;
using System.Web.Optimization;
using ReactTemplate.Utils.BundleUtils.Filters;

namespace ReactTemplate.Utils.BundleUtils
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
            return IncludeWithReferences(null, null, virtualPaths);
        }

        public Bundle IncludeWithReferences(FileFilter filter, params string[] virtualPaths)
        {
            return IncludeWithReferences(filter, null, virtualPaths);
        }   

        /// <param name="encoding">Default UTF8</param>
        public Bundle IncludeWithReferences(FileFilter filter, Encoding encoding = null, params string[] virtualPaths)
        {
            var mustIncludeFiles = new ReferenceFilesCollector(_includedFiles, filter).IncludeFiles(virtualPaths, encoding);
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
