using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SchoolDataLayer.EntityModel.CollectionTypes;

namespace SchoolDataLayer.EntityModel
{
    [ComplexType]
    public partial class Phones : PersistableStringCollection
    {
        public Phones() : base(15, ", ", new [] {",", ";", "|"})
        {
        }

        protected override string ConvertSingleValueToPersistable(string value)
        {
            return base.ConvertSingleValueToPersistable(value).Trim();
        }
    }
}
