using SchoolDataLayer.EntityModel;

namespace SchoolDataLayer.EntityModel
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("Persons")]
    public partial class Person
    {
        public Person()
        {
            Phones = new Phones();
        }

        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50)]
        public string LastName { get; set; }

        [StringLength(50)]
        public string MiddleName { get; set; }

        public Gender Gender { get; set; }

        [Required]
        [StringLength(400)]
        public string Address { get; set; }

        [StringLength(100)]
        public string Email { get; set; }

        public Phones Phones { get; set; }

        public virtual Learner Learner { get; set; }

        public virtual Parent Parent { get; set; }

        public virtual Teacher Teacher { get; set; }
    }
}
