
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 06/16/2015 13:15:30
-- Generated from EDMX file: E:\Work\_SVN\remote\NetPro\Learn\MVC4\School\SchoolDataLayer\EntityModel\Design\Model.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [School];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK_PersonTeacher]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Teachers] DROP CONSTRAINT [FK_PersonTeacher];
GO
IF OBJECT_ID(N'[dbo].[FK_PersonParent]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Parents] DROP CONSTRAINT [FK_PersonParent];
GO
IF OBJECT_ID(N'[dbo].[FK_PersonLearner]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Learners] DROP CONSTRAINT [FK_PersonLearner];
GO
IF OBJECT_ID(N'[dbo].[FK_LearnerParent_Learner]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[LearnerParent] DROP CONSTRAINT [FK_LearnerParent_Learner];
GO
IF OBJECT_ID(N'[dbo].[FK_LearnerParent_Parent]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[LearnerParent] DROP CONSTRAINT [FK_LearnerParent_Parent];
GO
IF OBJECT_ID(N'[dbo].[FK_TeacherCourse_Teacher]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[TeacherCourse] DROP CONSTRAINT [FK_TeacherCourse_Teacher];
GO
IF OBJECT_ID(N'[dbo].[FK_TeacherCourse_Course]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[TeacherCourse] DROP CONSTRAINT [FK_TeacherCourse_Course];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[Persons]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Persons];
GO
IF OBJECT_ID(N'[dbo].[Parents]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Parents];
GO
IF OBJECT_ID(N'[dbo].[Teachers]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Teachers];
GO
IF OBJECT_ID(N'[dbo].[Learners]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Learners];
GO
IF OBJECT_ID(N'[dbo].[Courses]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Courses];
GO
IF OBJECT_ID(N'[dbo].[LearnerParent]', 'U') IS NOT NULL
    DROP TABLE [dbo].[LearnerParent];
GO
IF OBJECT_ID(N'[dbo].[TeacherCourse]', 'U') IS NOT NULL
    DROP TABLE [dbo].[TeacherCourse];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'Persons'
CREATE TABLE [dbo].[Persons] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [FirstName] nvarchar(50)  NOT NULL,
    [LastName] nvarchar(50)  NOT NULL,
    [MiddleName] nvarchar(50)  NULL,
    [Gender] int  NOT NULL,
    [Address] nvarchar(400)  NOT NULL,
    [Email] nvarchar(100)  NULL,
    [Phones_SerializedValue] nvarchar(max)  NULL
);
GO

-- Creating table 'Parents'
CREATE TABLE [dbo].[Parents] (
    [IdPerson] int IDENTITY(1,1) NOT NULL,
    [JobPlace] nvarchar(200)  NULL,
    [Office] nvarchar(200)  NULL
);
GO

-- Creating table 'Teachers'
CREATE TABLE [dbo].[Teachers] (
    [IdPerson] int IDENTITY(1,1) NOT NULL,
    [ScholasticDegree] nvarchar(max)  NULL
);
GO

-- Creating table 'Learners'
CREATE TABLE [dbo].[Learners] (
    [IdPerson] int IDENTITY(1,1) NOT NULL,
    [Birthdate] datetime  NOT NULL,
    [School] nvarchar(100)  NOT NULL,
    [Class] nvarchar(10)  NOT NULL
);
GO

-- Creating table 'Courses'
CREATE TABLE [dbo].[Courses] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [IdPerson] int  NOT NULL,
    [Name] nvarchar(100)  NOT NULL
);
GO

-- Creating table 'LearnerParent'
CREATE TABLE [dbo].[LearnerParent] (
    [Learner_IdPerson] int  NOT NULL,
    [Parent_IdPerson] int  NOT NULL
);
GO

-- Creating table 'TeacherCourse'
CREATE TABLE [dbo].[TeacherCourse] (
    [Teacher_IdPerson] int  NOT NULL,
    [Course_Id] int  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [Id] in table 'Persons'
ALTER TABLE [dbo].[Persons]
ADD CONSTRAINT [PK_Persons]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [IdPerson] in table 'Parents'
ALTER TABLE [dbo].[Parents]
ADD CONSTRAINT [PK_Parents]
    PRIMARY KEY CLUSTERED ([IdPerson] ASC);
GO

-- Creating primary key on [IdPerson] in table 'Teachers'
ALTER TABLE [dbo].[Teachers]
ADD CONSTRAINT [PK_Teachers]
    PRIMARY KEY CLUSTERED ([IdPerson] ASC);
GO

-- Creating primary key on [IdPerson] in table 'Learners'
ALTER TABLE [dbo].[Learners]
ADD CONSTRAINT [PK_Learners]
    PRIMARY KEY CLUSTERED ([IdPerson] ASC);
GO

-- Creating primary key on [Id] in table 'Courses'
ALTER TABLE [dbo].[Courses]
ADD CONSTRAINT [PK_Courses]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Learner_IdPerson], [Parent_IdPerson] in table 'LearnerParent'
ALTER TABLE [dbo].[LearnerParent]
ADD CONSTRAINT [PK_LearnerParent]
    PRIMARY KEY CLUSTERED ([Learner_IdPerson], [Parent_IdPerson] ASC);
GO

-- Creating primary key on [Teacher_IdPerson], [Course_Id] in table 'TeacherCourse'
ALTER TABLE [dbo].[TeacherCourse]
ADD CONSTRAINT [PK_TeacherCourse]
    PRIMARY KEY CLUSTERED ([Teacher_IdPerson], [Course_Id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [IdPerson] in table 'Teachers'
ALTER TABLE [dbo].[Teachers]
ADD CONSTRAINT [FK_PersonTeacher]
    FOREIGN KEY ([IdPerson])
    REFERENCES [dbo].[Persons]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [IdPerson] in table 'Parents'
ALTER TABLE [dbo].[Parents]
ADD CONSTRAINT [FK_PersonParent]
    FOREIGN KEY ([IdPerson])
    REFERENCES [dbo].[Persons]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [IdPerson] in table 'Learners'
ALTER TABLE [dbo].[Learners]
ADD CONSTRAINT [FK_PersonLearner]
    FOREIGN KEY ([IdPerson])
    REFERENCES [dbo].[Persons]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [Learner_IdPerson] in table 'LearnerParent'
ALTER TABLE [dbo].[LearnerParent]
ADD CONSTRAINT [FK_LearnerParent_Learner]
    FOREIGN KEY ([Learner_IdPerson])
    REFERENCES [dbo].[Learners]
        ([IdPerson])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [Parent_IdPerson] in table 'LearnerParent'
ALTER TABLE [dbo].[LearnerParent]
ADD CONSTRAINT [FK_LearnerParent_Parent]
    FOREIGN KEY ([Parent_IdPerson])
    REFERENCES [dbo].[Parents]
        ([IdPerson])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_LearnerParent_Parent'
CREATE INDEX [IX_FK_LearnerParent_Parent]
ON [dbo].[LearnerParent]
    ([Parent_IdPerson]);
GO

-- Creating foreign key on [Teacher_IdPerson] in table 'TeacherCourse'
ALTER TABLE [dbo].[TeacherCourse]
ADD CONSTRAINT [FK_TeacherCourse_Teacher]
    FOREIGN KEY ([Teacher_IdPerson])
    REFERENCES [dbo].[Teachers]
        ([IdPerson])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [Course_Id] in table 'TeacherCourse'
ALTER TABLE [dbo].[TeacherCourse]
ADD CONSTRAINT [FK_TeacherCourse_Course]
    FOREIGN KEY ([Course_Id])
    REFERENCES [dbo].[Courses]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_TeacherCourse_Course'
CREATE INDEX [IX_FK_TeacherCourse_Course]
ON [dbo].[TeacherCourse]
    ([Course_Id]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------