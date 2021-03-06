namespace DataLayer.Model
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class GeoActual
    {
        public int Id { get; set; }

        public int GeoId { get; set; }

        public int OwnerId { get; set; }

        public DateTime Date { get; set; }

        public bool Value { get; set; }

        public virtual Geo Geo { get; set; }
    }
}
