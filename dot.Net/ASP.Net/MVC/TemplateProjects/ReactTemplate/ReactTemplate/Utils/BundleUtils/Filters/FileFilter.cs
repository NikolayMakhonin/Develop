using System.Collections.Generic;

namespace ReactTemplate.Utils.BundleUtils.Filters
{
    public delegate bool FileFilter(FileInfo fileInfo);

    public class FileFilterCollection
    {
        private readonly IEnumerable<FileFilter> _filters;
        public FileFilterCollection(params FileFilter[] filters) : this((IEnumerable<FileFilter>)filters) { }
        public FileFilterCollection(IEnumerable<FileFilter> filters)
        {
            _filters = filters;
        }

        public bool Filter(FileInfo fileInfo)
        {
            foreach (var filter in _filters)
            {
                if (!filter(fileInfo)) return false;
            }
            return true;
        }
    }
}