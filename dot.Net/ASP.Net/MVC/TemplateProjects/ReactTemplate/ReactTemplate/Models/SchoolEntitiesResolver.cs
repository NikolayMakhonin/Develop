using System;
using AspNetUtils.Controllers.OData;
using SchoolDataLayer.EntityModel;

namespace ReactTemplate.Models
{
    public class SchoolEntitiesResolver : EntitiesResolver
    {
        private static SchoolEntitiesResolver _instance;

        public static SchoolEntitiesResolver Instance
        {
            get { return _instance ?? (_instance = new SchoolEntitiesResolver()); }
        }

        private SchoolEntitiesResolver()
        {
            AddEntity<Person, int>("Person", id => entity => entity.Id == id,
                (entity, apiName, relationEntity) =>
                {
                    switch (apiName)
                    {
                        case "Teacher":
                            entity.Teacher = (Teacher)relationEntity;
                            break;
                        case "Parent":
                            entity.Parent = (Parent)relationEntity;
                            break;
                        case "Learner":
                            entity.Learner = (Learner)relationEntity;
                            break;
                        default:
                            throw new NotImplementedException(String.Format("Relationship with '{0}' not allowed for entity type: {1}", apiName, entity.GetType()));
                    }
                },
                (entity, apiName, relationEntity) =>
                {
                    switch (apiName)
                    {
                        //case "Teacher":
                        //    entity.Teacher = null;
                        //    break;
                        //case "Parent":
                        //    entity.Parent = null;
                        //    break;
                        //case "Learner":
                        //    entity.Learner = null;
                        //    break;
                        default:
                            throw new NotImplementedException(String.Format("Relationship with '{0}' not allowed for entity type: {1}", apiName, entity.GetType()));
                    }
                });

            AddEntity<Learner, int>("Learner", id => entity => entity.IdPerson == id,
                (entity, apiName, relationEntity) =>
                {
                    switch (apiName)
                    {
                        case "Person":
                            entity.Person = (Person)relationEntity;
                            break;
                        case "Parent":
                            entity.Parents.Add((Parent)relationEntity);
                            break;
                        default:
                            throw new NotImplementedException(String.Format("Relationship with '{0}' not allowed for entity type: {1}", apiName, entity.GetType()));
                    }
                },
                (entity, apiName, relationEntity) =>
                {
                    switch (apiName)
                    {
                        //case "Person":
                        //    entity.Person = null;
                        //    break;
                        case "Parent":
                            entity.Parents.Remove((Parent)relationEntity);
                            break;
                        default:
                            throw new NotImplementedException(String.Format("Relationship with '{0}' not allowed for entity type: {1}", apiName, entity.GetType()));
                    }
                });

            AddEntity<Teacher, int>("Teacher", id => entity => entity.IdPerson == id,
                (entity, apiName, relationEntity) =>
                {
                    switch (apiName)
                    {
                        case "Person":
                            entity.Person = (Person)relationEntity;
                            break;
                        case "Course":
                            entity.Courses.Add((Course)relationEntity);
                            break;
                        default:
                            throw new NotImplementedException(String.Format("Relationship with '{0}' not allowed for entity type: {1}", apiName, entity.GetType()));
                    }
                },
                (entity, apiName, relationEntity) =>
                {
                    switch (apiName)
                    {
                        //case "Person":
                        //    entity.Person = null;
                        //    break;
                        case "Learner":
                            entity.Courses.Remove((Course)relationEntity);
                            break;
                        default:
                            throw new NotImplementedException(String.Format("Relationship with '{0}' not allowed for entity type: {1}", apiName, entity.GetType()));
                    }
                });

            AddEntity<Parent, int>("Parent", id => entity => entity.IdPerson == id,
                (entity, apiName, relationEntity) =>
                {
                    switch (apiName)
                    {
                        case "Person":
                            entity.Person = (Person)relationEntity;
                            break;
                        case "Learner":
                            entity.Childs.Add((Learner)relationEntity);
                            break;
                        default:
                            throw new NotImplementedException(String.Format("Relationship with '{0}' not allowed for entity type: {1}", apiName, entity.GetType()));
                    }
                },
                (entity, apiName, relationEntity) =>
                {
                    switch (apiName)
                    {
                        //case "Person":
                        //    entity.Person = null;
                        //    break;
                        case "Learner":
                            entity.Childs.Remove((Learner)relationEntity);
                            break;
                        default:
                            throw new NotImplementedException(String.Format("Relationship with '{0}' not allowed for entity type: {1}", apiName, entity.GetType()));
                    }
                });

            AddEntity<Course, int>("Course", id => entity => entity.Id == id,
                (entity, apiName, relationEntity) =>
                {
                    switch (apiName)
                    {
                        case "Teacher":
                            entity.Teachers.Add((Teacher)relationEntity);
                            break;
                        default:
                            throw new NotImplementedException(String.Format("Relationship with '{0}' not allowed for entity type: {1}", apiName, entity.GetType()));
                    }
                },
                (entity, apiName, relationEntity) =>
                {
                    switch (apiName)
                    {
                        case "Teacher":
                            entity.Teachers.Remove((Teacher)relationEntity);
                            break;
                        default:
                            throw new NotImplementedException(String.Format("Relationship with '{0}' not allowed for entity type: {1}", apiName, entity.GetType()));
                    }
                });
        }
    }
}
