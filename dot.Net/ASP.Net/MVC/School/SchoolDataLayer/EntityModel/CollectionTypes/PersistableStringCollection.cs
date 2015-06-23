using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolDataLayer.EntityModel.CollectionTypes
{
    /// <summary>
    /// ALlows persisting of a simple integer collection.
    /// </summary>
    [ComplexType]
    public class PersistableStringCollection : PersistableScalarCollection<string>
    {
        private readonly int _maxStringLength;

        public PersistableStringCollection(int maxStringLength, string defaultValueSeperator, string[] defaultValueSeperators = null)
            : base(defaultValueSeperator, defaultValueSeperators ?? new[] { defaultValueSeperator })
        {
            _maxStringLength = maxStringLength;
        }

        protected override string ConvertSingleValueToRuntime(string rawValue)
        {
            return rawValue;
        }

        protected override string ConvertSingleValueToPersistable(string value)
        {
            return value.Length > _maxStringLength ? value.Substring(0, _maxStringLength) : value;
        }
    }
}
