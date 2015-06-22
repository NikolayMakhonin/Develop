namespace DataLayer.Model
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Comment
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Comment()
        {
            CommentRatings = new HashSet<CommentRating>();
            Comments1 = new HashSet<Comment>();
        }

        public int Id { get; set; }

        public int? ParentId { get; set; }

        public int OwnerId { get; set; }

        public int? LanguageId { get; set; }

        [StringLength(256)]
        public string Title { get; set; }

        public DateTime Date { get; set; }

        [StringLength(4096)]
        public string Content { get; set; }

        public bool Deleted { get; set; }

        public int? Geo_Id { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CommentRating> CommentRatings { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Comment> Comments1 { get; set; }

        public virtual Comment Comment1 { get; set; }

        public virtual Geo Geo { get; set; }

        public virtual Language Language { get; set; }
    }
}
