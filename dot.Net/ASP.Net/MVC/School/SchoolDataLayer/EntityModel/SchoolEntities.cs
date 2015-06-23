namespace SchoolDataLayer.EntityModel
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class SchoolEntities : DbContext
    {
        public SchoolEntities()
            : base("name=SchoolEntities")
        {
        }

        public virtual DbSet<Course> Courses { get; set; }
        public virtual DbSet<Learner> Learners { get; set; }
        public virtual DbSet<Parent> Parents { get; set; }
        public virtual DbSet<Person> Persons { get; set; }
        public virtual DbSet<Teacher> Teachers { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Course>()
                .HasMany(e => e.Teachers)
                .WithMany(e => e.Courses)
                .Map(m => m.ToTable("TeacherCourse").MapLeftKey("Course_Id").MapRightKey("Teacher_IdPerson"));

            modelBuilder.Entity<Learner>()
                .HasMany(e => e.Parents)
                .WithMany(e => e.Childs)
                .Map(m => m.ToTable("LearnerParent").MapLeftKey("Learner_IdPerson").MapRightKey("Parent_IdPerson"));

            modelBuilder.Entity<Person>()
                .HasOptional(e => e.Learner)
                .WithRequired(e => e.Person);

            modelBuilder.Entity<Person>()
                .HasOptional(e => e.Parent)
                .WithRequired(e => e.Person);

            modelBuilder.Entity<Person>()
                .HasOptional(e => e.Teacher)
                .WithRequired(e => e.Person);
        }
    }
}
