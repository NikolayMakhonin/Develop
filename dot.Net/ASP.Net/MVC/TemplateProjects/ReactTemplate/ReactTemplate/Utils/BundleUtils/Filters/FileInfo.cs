using System;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Web;

namespace ReactTemplate.Utils.BundleUtils.Filters
{
    public class FileInfo
    {
        private bool _mustWriteContent;
        private string _content;
        private readonly Encoding _encoding;
        private string _path;
        private string _virtualPath;

        public FileInfo(string virtualPath, Encoding encoding = null)
        {
            _virtualPath = virtualPath;
            _encoding = encoding ?? Encoding.UTF8;
        }

        public string VirtualPath
        {
            get { return _virtualPath; }
            set
            {
                _virtualPath = value;
                _path = null;
                _content = null;
                _mustWriteContent = false;
            }
        }

        public Encoding Encoding
        {
            get
            {
                return _encoding;
            }
        }

        private string Path
        {
            get
            {
                return _path ?? (_path = HttpContext.Current.Server.MapPath(_virtualPath));
            }
        }

        public bool MoveTo(string newVirtualPath)
        {
            if (_virtualPath == newVirtualPath) return true;
            var newPath = HttpContext.Current.Server.MapPath(newVirtualPath);

            if (!File.Exists(Path))
            {
                Debug.WriteLine("FileInfo: File not found: " + Path);
                return false;
            }

            try
            {
                if (File.Exists(newPath))
                {
                    File.Delete(newPath);
                }
                File.Move(Path, newPath);
                _virtualPath = newVirtualPath;
                _path = newPath;
            }
            catch (Exception exception)
            {
                Debug.WriteLine("FileInfo: Move file error: " + newPath);
                Debug.WriteLine(exception.ToString());
                return false;
            }
            return true;
        }

        public string Content
        {
            get
            {
                return _content ?? (_content = getContent(Path, _encoding)); 
            }
            set
            {
                if (_content == value) return;
                _content = value;
                if (_content != null) _mustWriteContent = true;
            }
        }

        private static string getContent(string path, Encoding _encoding)
        {
            if (!File.Exists(path))
            {
                Debug.WriteLine("FileInfo: File not found: " + path);
                return null;
            }

            try
            {
                return File.ReadAllText(path, _encoding);
            }
            catch (Exception exception)
            {
                Debug.WriteLine("FileInfo: Read file error: " + path);
                Debug.WriteLine(exception.ToString());
                return null;
            }
        }

        public bool Flush()
        {
            if (_mustWriteContent)
            {
                try
                {
                    File.WriteAllText(Path, _content, _encoding);
                }
                catch (Exception exception)
                {
                    Debug.WriteLine("FileInfo: Write file error: " + Path);
                    Debug.WriteLine(exception.ToString());
                    return false;
                }
            }
            return true;
        }
    }
}