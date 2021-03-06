//------------------------------------------------------------------------------
// <auto-generated>
//     Этот код создан по шаблону.
//
//     Изменения, вносимые в этот файл вручную, могут привести к непредвиденной работе приложения.
//     Изменения, вносимые в этот файл вручную, будут перезаписаны при повторном создании кода.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DataLayer.Design
{
    using System;
    using System.Collections.Generic;
    
    public partial class Comment
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Comment()
        {
            this.Deleted = false;
            this.Childs = new HashSet<Comment>();
            this.Ratings = new HashSet<CommentRating>();
        }
    
        public int Id { get; set; }
        public Nullable<int> ParentId { get; set; }
        public int OwnerId { get; set; }
        public Nullable<int> LanguageId { get; set; }
        public string Title { get; set; }
        public System.DateTime Date { get; set; }
        public string Content { get; set; }
        public bool Deleted { get; set; }
    
        public virtual Comment Parent { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Comment> Childs { get; set; }
        public virtual Geo Geo { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CommentRating> Ratings { get; set; }
        public virtual Language Language { get; set; }
    }
}
