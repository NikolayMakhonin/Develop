
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 06/22/2015 17:27:31
-- Generated from EDMX file: E:\Work\_GIT\Develop\dot.Net\ASP.Net\MVC\GeoBase\DataLayer\Design\DesignModel.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [GeoBase];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK_CommentChilds]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Comments] DROP CONSTRAINT [FK_CommentChilds];
GO
IF OBJECT_ID(N'[dbo].[FK_GeoComment]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Comments] DROP CONSTRAINT [FK_GeoComment];
GO
IF OBJECT_ID(N'[dbo].[FK_GeoGeoActual]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[GeoActuals] DROP CONSTRAINT [FK_GeoGeoActual];
GO
IF OBJECT_ID(N'[dbo].[FK_GeoGeoRating]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[GeoRatings] DROP CONSTRAINT [FK_GeoGeoRating];
GO
IF OBJECT_ID(N'[dbo].[FK_GeoGeoTag]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[GeoTags] DROP CONSTRAINT [FK_GeoGeoTag];
GO
IF OBJECT_ID(N'[dbo].[FK_CommentCommentRating]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[CommentRatings] DROP CONSTRAINT [FK_CommentCommentRating];
GO
IF OBJECT_ID(N'[dbo].[FK_LanguageComment]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Comments] DROP CONSTRAINT [FK_LanguageComment];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[Comments]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Comments];
GO
IF OBJECT_ID(N'[dbo].[CommentRatings]', 'U') IS NOT NULL
    DROP TABLE [dbo].[CommentRatings];
GO
IF OBJECT_ID(N'[dbo].[GeoActuals]', 'U') IS NOT NULL
    DROP TABLE [dbo].[GeoActuals];
GO
IF OBJECT_ID(N'[dbo].[Geos]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Geos];
GO
IF OBJECT_ID(N'[dbo].[GeoTags]', 'U') IS NOT NULL
    DROP TABLE [dbo].[GeoTags];
GO
IF OBJECT_ID(N'[dbo].[GeoRatings]', 'U') IS NOT NULL
    DROP TABLE [dbo].[GeoRatings];
GO
IF OBJECT_ID(N'[dbo].[Languages]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Languages];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'Comments'
CREATE TABLE [dbo].[Comments] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [ParentId] int  NULL,
    [OwnerId] int  NOT NULL,
    [LanguageId] int  NULL,
    [Title] varchar(256)  NULL,
    [Date] datetime  NOT NULL,
    [Content] varchar(4096)  NULL,
    [Deleted] bit  NOT NULL,
    [Geo_Id] int  NULL
);
GO

-- Creating table 'CommentRatings'
CREATE TABLE [dbo].[CommentRatings] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [CommentId] int  NOT NULL,
    [OwnerId] int  NOT NULL,
    [Date] datetime  NOT NULL,
    [Value] int  NOT NULL
);
GO

-- Creating table 'GeoActuals'
CREATE TABLE [dbo].[GeoActuals] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [GeoId] int  NOT NULL,
    [OwnerId] int  NOT NULL,
    [Date] datetime  NOT NULL,
    [Value] bit  NOT NULL
);
GO

-- Creating table 'Geos'
CREATE TABLE [dbo].[Geos] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Title] nvarchar(256)  NULL,
    [Date] datetime  NOT NULL,
    [GeoData] geography  NOT NULL
);
GO

-- Creating table 'GeoTags'
CREATE TABLE [dbo].[GeoTags] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [GeoId] int  NOT NULL,
    [OwnerId] int  NOT NULL,
    [Date] datetime  NOT NULL,
    [Name] nvarchar(100)  NOT NULL
);
GO

-- Creating table 'GeoRatings'
CREATE TABLE [dbo].[GeoRatings] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [GeoId] int  NOT NULL,
    [OwnerId] int  NOT NULL,
    [Date] datetime  NOT NULL,
    [Value] int  NOT NULL
);
GO

-- Creating table 'Languages'
CREATE TABLE [dbo].[Languages] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Code] nchar(2)  NOT NULL,
    [FullName] nvarchar(max)  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [Id] in table 'Comments'
ALTER TABLE [dbo].[Comments]
ADD CONSTRAINT [PK_Comments]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'CommentRatings'
ALTER TABLE [dbo].[CommentRatings]
ADD CONSTRAINT [PK_CommentRatings]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'GeoActuals'
ALTER TABLE [dbo].[GeoActuals]
ADD CONSTRAINT [PK_GeoActuals]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Geos'
ALTER TABLE [dbo].[Geos]
ADD CONSTRAINT [PK_Geos]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'GeoTags'
ALTER TABLE [dbo].[GeoTags]
ADD CONSTRAINT [PK_GeoTags]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'GeoRatings'
ALTER TABLE [dbo].[GeoRatings]
ADD CONSTRAINT [PK_GeoRatings]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Languages'
ALTER TABLE [dbo].[Languages]
ADD CONSTRAINT [PK_Languages]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [ParentId] in table 'Comments'
ALTER TABLE [dbo].[Comments]
ADD CONSTRAINT [FK_CommentChilds]
    FOREIGN KEY ([ParentId])
    REFERENCES [dbo].[Comments]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_CommentChilds'
CREATE INDEX [IX_FK_CommentChilds]
ON [dbo].[Comments]
    ([ParentId]);
GO

-- Creating foreign key on [Geo_Id] in table 'Comments'
ALTER TABLE [dbo].[Comments]
ADD CONSTRAINT [FK_GeoComment]
    FOREIGN KEY ([Geo_Id])
    REFERENCES [dbo].[Geos]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_GeoComment'
CREATE INDEX [IX_FK_GeoComment]
ON [dbo].[Comments]
    ([Geo_Id]);
GO

-- Creating foreign key on [GeoId] in table 'GeoActuals'
ALTER TABLE [dbo].[GeoActuals]
ADD CONSTRAINT [FK_GeoGeoActual]
    FOREIGN KEY ([GeoId])
    REFERENCES [dbo].[Geos]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_GeoGeoActual'
CREATE INDEX [IX_FK_GeoGeoActual]
ON [dbo].[GeoActuals]
    ([GeoId]);
GO

-- Creating foreign key on [GeoId] in table 'GeoRatings'
ALTER TABLE [dbo].[GeoRatings]
ADD CONSTRAINT [FK_GeoGeoRating]
    FOREIGN KEY ([GeoId])
    REFERENCES [dbo].[Geos]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_GeoGeoRating'
CREATE INDEX [IX_FK_GeoGeoRating]
ON [dbo].[GeoRatings]
    ([GeoId]);
GO

-- Creating foreign key on [GeoId] in table 'GeoTags'
ALTER TABLE [dbo].[GeoTags]
ADD CONSTRAINT [FK_GeoGeoTag]
    FOREIGN KEY ([GeoId])
    REFERENCES [dbo].[Geos]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_GeoGeoTag'
CREATE INDEX [IX_FK_GeoGeoTag]
ON [dbo].[GeoTags]
    ([GeoId]);
GO

-- Creating foreign key on [CommentId] in table 'CommentRatings'
ALTER TABLE [dbo].[CommentRatings]
ADD CONSTRAINT [FK_CommentCommentRating]
    FOREIGN KEY ([CommentId])
    REFERENCES [dbo].[Comments]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_CommentCommentRating'
CREATE INDEX [IX_FK_CommentCommentRating]
ON [dbo].[CommentRatings]
    ([CommentId]);
GO

-- Creating foreign key on [LanguageId] in table 'Comments'
ALTER TABLE [dbo].[Comments]
ADD CONSTRAINT [FK_LanguageComment]
    FOREIGN KEY ([LanguageId])
    REFERENCES [dbo].[Languages]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_LanguageComment'
CREATE INDEX [IX_FK_LanguageComment]
ON [dbo].[Comments]
    ([LanguageId]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------