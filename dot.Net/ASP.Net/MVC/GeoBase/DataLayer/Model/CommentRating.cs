namespace DataLayer.Model
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class CommentRating
    {
        public int Id { get; set; }

        public int CommentId { get; set; }

        public int OwnerId { get; set; }

        public DateTime Date { get; set; }

        public int Value { get; set; }

        public virtual Comment Comment { get; set; }
    }
}
