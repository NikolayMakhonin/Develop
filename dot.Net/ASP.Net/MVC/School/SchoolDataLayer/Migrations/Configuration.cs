using System.Data.Entity.Migrations.Design;
using System.Data.Entity.Migrations.Model;
using System.Data.Entity.Migrations.Utilities;
using SchoolDataLayer.EntityModel;

namespace SchoolDataLayer.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<SchoolEntities>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(SchoolEntities context)
        {
            //  This method will be called after migrating to the latest version.

            #region Persons

            var learner = context.Persons.Add(new Person
            {
                FirstName = "Andrew",
                LastName = "Peters",
                Address = "41, 10178 Berlin, Germany",
                Email = "andrew_peters@gmail.com",
                Gender = Gender.Male
            });

            var parent = context.Persons.Add(new Person
            {
                FirstName = "Rowan",
                LastName = "Miller",
                Address = "41, 10178 Berlin, Germany",
                Email = "rowan_miller@gmail.com",
                Gender = Gender.Male
            });

            var parentTeacher = context.Persons.Add(new Person
            {
                FirstName = "Marie",
                LastName = "Miller",
                Address = "41, 10178 Berlin, Germany",
                Email = "marie_miller@gmail.com",
                Gender = Gender.Female
            });

            var teacher = context.Persons.Add(new Person
            {
                FirstName = "Emma",
                LastName = "Lambson",
                Address = "11, 10279 Berlin, Germany",
                Email = "emma_lambson@gmail.com",
                Gender = Gender.Female
            });

            #endregion

            #region Parents

            parent.Parent = context.Parents.Add(new Parent
            {
                JobPlace = "Microsoft",
                Office = "Developer"
            });

            parentTeacher.Parent = context.Parents.Add(new Parent
            {
                JobPlace = "Berlin school",
                Office = "Teacher"
            });

            #endregion

            #region Teachers

            parentTeacher.Teacher = context.Teachers.Add(new Teacher
            {
                ScholasticDegree = "Teacher"
            });

            teacher.Teacher = context.Teachers.Add(new Teacher
            {
                ScholasticDegree = "Senior teacher"
            });

            teacher.Teacher.Courses.Add(context.Courses.Add(new Course { Name = "Mathematics" }));
            teacher.Teacher.Courses.Add(context.Courses.Add(new Course { Name = "Programming" }));

            #endregion

            #region Learners

            learner.Learner = context.Learners.Add(new Learner
            {
                Birthdate = new DateTime(2005, 10, 12),
                Class = "3 class",
                School = "Berlin school"
            });

            learner.Learner.Parents.Add(parent.Parent);
            learner.Learner.Parents.Add(parentTeacher.Parent);

            #endregion

            base.Seed(context);
        }
    }
}
