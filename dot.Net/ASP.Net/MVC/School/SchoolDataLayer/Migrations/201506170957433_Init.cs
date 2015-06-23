namespace SchoolDataLayer.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Init : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Courses",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        IdPerson = c.Int(nullable: false),
                        Name = c.String(nullable: false, maxLength: 100),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Teachers",
                c => new
                    {
                        IdPerson = c.Int(nullable: false),
                        ScholasticDegree = c.String(),
                    })
                .PrimaryKey(t => t.IdPerson)
                .ForeignKey("dbo.Persons", t => t.IdPerson)
                .Index(t => t.IdPerson);
            
            CreateTable(
                "dbo.Persons",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FirstName = c.String(nullable: false, maxLength: 50),
                        LastName = c.String(nullable: false, maxLength: 50),
                        MiddleName = c.String(maxLength: 50),
                        Gender = c.Int(nullable: false),
                        Address = c.String(nullable: false, maxLength: 400),
                        Email = c.String(maxLength: 100),
                        Phones_SerializedValue = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Learners",
                c => new
                    {
                        IdPerson = c.Int(nullable: false),
                        Birthdate = c.DateTime(nullable: false),
                        School = c.String(nullable: false, maxLength: 100),
                        Class = c.String(nullable: false, maxLength: 10),
                    })
                .PrimaryKey(t => t.IdPerson)
                .ForeignKey("dbo.Persons", t => t.IdPerson)
                .Index(t => t.IdPerson);
            
            CreateTable(
                "dbo.Parents",
                c => new
                    {
                        IdPerson = c.Int(nullable: false),
                        JobPlace = c.String(maxLength: 200),
                        Office = c.String(maxLength: 200),
                    })
                .PrimaryKey(t => t.IdPerson)
                .ForeignKey("dbo.Persons", t => t.IdPerson)
                .Index(t => t.IdPerson);
            
            CreateTable(
                "dbo.LearnerParent",
                c => new
                    {
                        Learner_IdPerson = c.Int(nullable: false),
                        Parent_IdPerson = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Learner_IdPerson, t.Parent_IdPerson })
                .ForeignKey("dbo.Learners", t => t.Learner_IdPerson, cascadeDelete: true)
                .ForeignKey("dbo.Parents", t => t.Parent_IdPerson, cascadeDelete: true)
                .Index(t => t.Learner_IdPerson)
                .Index(t => t.Parent_IdPerson);
            
            CreateTable(
                "dbo.TeacherCourse",
                c => new
                    {
                        Course_Id = c.Int(nullable: false),
                        Teacher_IdPerson = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Course_Id, t.Teacher_IdPerson })
                .ForeignKey("dbo.Courses", t => t.Course_Id, cascadeDelete: true)
                .ForeignKey("dbo.Teachers", t => t.Teacher_IdPerson, cascadeDelete: true)
                .Index(t => t.Course_Id)
                .Index(t => t.Teacher_IdPerson);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.TeacherCourse", "Teacher_IdPerson", "dbo.Teachers");
            DropForeignKey("dbo.TeacherCourse", "Course_Id", "dbo.Courses");
            DropForeignKey("dbo.Teachers", "IdPerson", "dbo.Persons");
            DropForeignKey("dbo.Parents", "IdPerson", "dbo.Persons");
            DropForeignKey("dbo.Learners", "IdPerson", "dbo.Persons");
            DropForeignKey("dbo.LearnerParent", "Parent_IdPerson", "dbo.Parents");
            DropForeignKey("dbo.LearnerParent", "Learner_IdPerson", "dbo.Learners");
            DropIndex("dbo.TeacherCourse", new[] { "Teacher_IdPerson" });
            DropIndex("dbo.TeacherCourse", new[] { "Course_Id" });
            DropIndex("dbo.LearnerParent", new[] { "Parent_IdPerson" });
            DropIndex("dbo.LearnerParent", new[] { "Learner_IdPerson" });
            DropIndex("dbo.Parents", new[] { "IdPerson" });
            DropIndex("dbo.Learners", new[] { "IdPerson" });
            DropIndex("dbo.Teachers", new[] { "IdPerson" });
            DropTable("dbo.TeacherCourse");
            DropTable("dbo.LearnerParent");
            DropTable("dbo.Parents");
            DropTable("dbo.Learners");
            DropTable("dbo.Persons");
            DropTable("dbo.Teachers");
            DropTable("dbo.Courses");
        }
    }
}
