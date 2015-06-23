namespace SchoolDataLayer.EntityModel
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("Learners")]
    public partial class Learner
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Learner()
        {
            Parents = new HashSet<Parent>();
        }

        [Key]
        public int IdPerson { get; set; }

        public DateTime Birthdate { get; set; }

        [Required]
        [StringLength(100)]
        public string School { get; set; }

        [Required]
        [StringLength(10)]
        public string Class { get; set; }

        public virtual Person Person { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Parent> Parents { get; set; }
    }
}
