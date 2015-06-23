using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace SchoolDataLayer.EntityModel.CollectionTypes
{
    /// <summary>
    /// Baseclass that allows persisting of scalar values as a collection (which is not supported by EF 4.3)
    /// </summary>
    /// <typeparam name="T">Type of the single collection entry that should be persisted.</typeparam>
    [ComplexType]
    public abstract class PersistableScalarCollection<T> : IList<T>
    {

        // use a character that will not occur in the collection.
        // this can be overriden using the given abstract methods (e.g. for list of strings).
        readonly string _defaultValueSeperator;

        readonly string[] _defaultValueSeperators;

        /// <summary>    
        /// The internal data container for the list data.
        /// </summary>
        private List<T> Data { get; set; }

        protected PersistableScalarCollection(string defaultValueSeperator = "|", string[] defaultValueSeperators = null)
        {
            _defaultValueSeperator = defaultValueSeperator;
            _defaultValueSeperators = defaultValueSeperators ?? new[] { defaultValueSeperator };
            Data = new List<T>();
        }

        /// <summary>
        /// Implementors have to convert the given value raw value to the correct runtime-type.
        /// </summary>
        /// <param name="rawValue">the already seperated raw value from the database</param>
        /// <returns></returns>
        protected abstract T ConvertSingleValueToRuntime(string rawValue);

        /// <summary>
        /// Implementors should convert the given runtime value to a persistable form.
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        protected abstract string ConvertSingleValueToPersistable(T value);

        private string _valueSeperator;
        /// <summary>
        /// Deriving classes can override the string that is used to seperate single values
        /// </summary>        
        [NotMapped]
        public string ValueSeperator
        {
            get
            {
                return _valueSeperator ?? _defaultValueSeperator;
            }
            set
            {
                _valueSeperator = value;
            }
        }

        private string[] _valueSeperators;

        /// <summary>
        /// Deriving classes can override the string that is used to seperate single values
        /// </summary> 
        [NotMapped]
        public string[] ValueSeperators
        {
            get
            {
                return _valueSeperators ?? _defaultValueSeperators;
            }
            set
            {
                _valueSeperators = value;
            }
        }

        /// <summary>
        /// DO NOT Modeify manually! This is only used to store/load the data.
        /// </summary>        
        public string SerializedValue
        {
            get
            {
                if (Data.Count == 0) return null;
                var serializedValue = string.Join(ValueSeperator,
                    Data.Select(ConvertSingleValueToPersistable)
                    .ToArray());
                return serializedValue;
            }
            set
            {
                if (string.IsNullOrEmpty(value))
                {
                    Data = new List<T>();
                    return;
                }

                Data = new List<T>(value.Split(ValueSeperators, StringSplitOptions.None)
                    .Select(ConvertSingleValueToRuntime));
            }
        }

        #region ICollection<T> Members

        public void Add(T item)
        {
            Data.Add(item);
        }

        public void Clear()
        {
            Data.Clear();
        }

        public bool Contains(T item)
        {
            return Data.Contains(item);
        }

        public void CopyTo(T[] array, int arrayIndex)
        {
            Data.CopyTo(array, arrayIndex);
        }

        public int Count
        {
            get { return Data.Count; }
        }

        public bool IsReadOnly
        {
            get { return false; }
        }

        public bool Remove(T item)
        {
            return Data.Remove(item);
        }

        #endregion

        #region IEnumerable<T> Members

        public IEnumerator<T> GetEnumerator()
        {
            return Data.GetEnumerator();
        }

        #endregion

        #region IEnumerable Members

        IEnumerator IEnumerable.GetEnumerator()
        {
            return Data.GetEnumerator();
        }

        #endregion

        public int IndexOf(T item)
        {
            return Data.IndexOf(item);
        }

        public void Insert(int index, T item)
        {
            Data.Insert(index, item);
        }

        public void RemoveAt(int index)
        {
            Data.RemoveAt(index);
        }

        public T this[int index]
        {
            get { return Data[index]; }
            set { Data[index] = value; }
        }
    }
}
