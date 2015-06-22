using System;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity.Spatial;

namespace GeoBase.Models.Geo
{
    public class GeographyCountValidationAttribute : ValidationAttribute
    {
        public int PointMinCount { get; set; }
        public int PointMaxCount { get; set; }
        public int ElementMinCount { get; set; }
        public int ElementMaxCount { get; set; }
        public int PointCount
        {
            get { return PointMinCount; }
            set
            {
                PointMinCount = value;
                PointMaxCount = value;
            }
        }
        public int ElementCount
        {
            get { return ElementMinCount; }
            set
            {
                ElementMinCount = value;
                ElementMaxCount = value;
            }
        }

        public GeographyCountValidationAttribute()
        {
            PointMinCount = 0;
            PointMaxCount = Int32.MaxValue;
            ElementMinCount = 0;
            ElementMaxCount = Int32.MaxValue;
        }

        public override bool IsValid(object value)
        {
            DbGeography geography = value as DbGeography;
            if (geography == null)
            {
                ErrorMessage = "Param must be type of DbGeography";
                return false;
            }
            if (checkMinMax(geography.ElementCount, ElementMinCount, ElementMaxCount, "ElementCount")) return false;
            if (checkMinMax(geography.PointCount, PointMinCount, PointMaxCount, "PointCount")) return false;
            return base.IsValid(value);
        }

        private bool checkMinMax(int? value, int min, int max, string fieldName)
        {
            if (!value.HasValue)
            {
                ErrorMessage = String.Format("geography.{0}(null) must be between {1} .. {2}", fieldName, min, max);
                return false;
            }
            if (value < min)
            {
                ErrorMessage = String.Format("geography.{0}({1}) must be >= {2}", fieldName, value, min);
                return false;
            }
            if (value > max)
            {
                ErrorMessage = String.Format("geography.{0}({1}) must be <= {2}", fieldName, value, max);
                return false;
            }
            return true;
        }
    }
}
