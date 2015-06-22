namespace DataLayer.Model
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class GeoModel : DbContext
    {
        public GeoModel()
            : base("name=GeoModel")
        {
        }

        public virtual DbSet<CommentRating> CommentRatings { get; set; }
        public virtual DbSet<Comment> Comments { get; set; }
        public virtual DbSet<GeoActual> GeoActuals { get; set; }
        public virtual DbSet<GeoRating> GeoRatings { get; set; }
        public virtual DbSet<Geo> Geos { get; set; }
        public virtual DbSet<GeoTag> GeoTags { get; set; }
        public virtual DbSet<Language> Languages { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Comment>()
                .Property(e => e.Title)
                .IsUnicode(false);

            modelBuilder.Entity<Comment>()
                .Property(e => e.Content)
                .IsUnicode(false);

            modelBuilder.Entity<Comment>()
                .HasMany(e => e.CommentRatings)
                .WithRequired(e => e.Comment)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Comment>()
                .HasMany(e => e.Comments1)
                .WithOptional(e => e.Comment1)
                .HasForeignKey(e => e.ParentId);

            modelBuilder.Entity<Geo>()
                .HasMany(e => e.Comments)
                .WithOptional(e => e.Geo)
                .HasForeignKey(e => e.Geo_Id);

            modelBuilder.Entity<Geo>()
                .HasMany(e => e.GeoActuals)
                .WithRequired(e => e.Geo)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Geo>()
                .HasMany(e => e.GeoRatings)
                .WithRequired(e => e.Geo)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Geo>()
                .HasMany(e => e.GeoTags)
                .WithRequired(e => e.Geo)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Language>()
                .Property(e => e.Code)
                .IsFixedLength();
        }
    }
}
