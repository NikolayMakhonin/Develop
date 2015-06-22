namespace DataLayer.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Init : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CommentRatings",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CommentId = c.Int(nullable: false),
                        OwnerId = c.Int(nullable: false),
                        Date = c.DateTime(nullable: false),
                        Value = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Comments", t => t.CommentId)
                .Index(t => t.CommentId);
            
            CreateTable(
                "dbo.Comments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ParentId = c.Int(),
                        OwnerId = c.Int(nullable: false),
                        LanguageId = c.Int(),
                        Title = c.String(maxLength: 256, unicode: false),
                        Date = c.DateTime(nullable: false),
                        Content = c.String(maxLength: 4096, unicode: false),
                        Deleted = c.Boolean(nullable: false),
                        Geo_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Comments", t => t.ParentId)
                .ForeignKey("dbo.Geos", t => t.Geo_Id)
                .ForeignKey("dbo.Languages", t => t.LanguageId)
                .Index(t => t.ParentId)
                .Index(t => t.Geo_Id)
                .Index(t => t.LanguageId);
            
            CreateTable(
                "dbo.Geos",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(maxLength: 256),
                        Date = c.DateTime(nullable: false),
                        GeoData = c.Geography(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.GeoActuals",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        GeoId = c.Int(nullable: false),
                        OwnerId = c.Int(nullable: false),
                        Date = c.DateTime(nullable: false),
                        Value = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Geos", t => t.GeoId)
                .Index(t => t.GeoId);
            
            CreateTable(
                "dbo.GeoRatings",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        GeoId = c.Int(nullable: false),
                        OwnerId = c.Int(nullable: false),
                        Date = c.DateTime(nullable: false),
                        Value = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Geos", t => t.GeoId)
                .Index(t => t.GeoId);
            
            CreateTable(
                "dbo.GeoTags",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        GeoId = c.Int(nullable: false),
                        OwnerId = c.Int(nullable: false),
                        Date = c.DateTime(nullable: false),
                        Name = c.String(nullable: false, maxLength: 100),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Geos", t => t.GeoId)
                .Index(t => t.GeoId);
            
            CreateTable(
                "dbo.Languages",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Code = c.String(nullable: false, maxLength: 2, fixedLength: true),
                        FullName = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Comments", "LanguageId", "dbo.Languages");
            DropForeignKey("dbo.GeoTags", "GeoId", "dbo.Geos");
            DropForeignKey("dbo.GeoRatings", "GeoId", "dbo.Geos");
            DropForeignKey("dbo.GeoActuals", "GeoId", "dbo.Geos");
            DropForeignKey("dbo.Comments", "Geo_Id", "dbo.Geos");
            DropForeignKey("dbo.Comments", "ParentId", "dbo.Comments");
            DropForeignKey("dbo.CommentRatings", "CommentId", "dbo.Comments");
            DropIndex("dbo.Comments", new[] { "LanguageId" });
            DropIndex("dbo.GeoTags", new[] { "GeoId" });
            DropIndex("dbo.GeoRatings", new[] { "GeoId" });
            DropIndex("dbo.GeoActuals", new[] { "GeoId" });
            DropIndex("dbo.Comments", new[] { "Geo_Id" });
            DropIndex("dbo.Comments", new[] { "ParentId" });
            DropIndex("dbo.CommentRatings", new[] { "CommentId" });
            DropTable("dbo.Languages");
            DropTable("dbo.GeoTags");
            DropTable("dbo.GeoRatings");
            DropTable("dbo.GeoActuals");
            DropTable("dbo.Geos");
            DropTable("dbo.Comments");
            DropTable("dbo.CommentRatings");
        }
    }
}
