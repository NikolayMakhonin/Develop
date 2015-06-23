using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using SchoolDataLayer.EntityModel;

namespace SchoolWebSite.Controllers
{
    public class LearnerController : Controller
    {
        private SchoolEntities db = new SchoolEntities();

        // GET: /Learner/
        public ActionResult Index()
        {
            var learners = db.Learners.Include(l => l.Person);
            var persons = learners.Select(learner => learner.Person);
            return View(persons.ToList());
        }

        // GET: /Learner/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Learner learner = db.Learners.Find(id);
            if (learner == null)
            {
                return HttpNotFound();
            }
            return View(learner);
        }

        // GET: /Learner/Create
        public ActionResult Create()
        {
            ViewBag.IdPerson = new SelectList(db.Persons, "Id", "FirstName");
            return View();
        }

        // POST: /Learner/Create
        // Чтобы защититься от атак чрезмерной передачи данных, включите определенные свойства, для которых следует установить привязку. Дополнительные 
        // сведения см. в статье http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include="IdPerson,Birthdate,School,Class")] Learner learner)
        {
            if (ModelState.IsValid)
            {
                db.Learners.Add(learner);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.IdPerson = new SelectList(db.Persons, "Id", "FirstName", learner.IdPerson);
            return View(learner);
        }

        // GET: /Learner/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Learner learner = db.Learners.Find(id);
            if (learner == null)
            {
                return HttpNotFound();
            }
            ViewBag.IdPerson = new SelectList(db.Persons, "Id", "FirstName", learner.IdPerson);
            return View(learner);
        }

        // POST: /Learner/Edit/5
        // Чтобы защититься от атак чрезмерной передачи данных, включите определенные свойства, для которых следует установить привязку. Дополнительные 
        // сведения см. в статье http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "IdPerson,Birthdate,School,Class,Person,Person.FirstName,Person.LastName,Person.MiddleName,Person.Gender,Person.Email,Person.Address,Person.Phones")] Learner learner)
        {
            if (ModelState.IsValid)
            {
                db.Entry(learner).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.IdPerson = new SelectList(db.Persons, "Id", "FirstName", learner.IdPerson);
            return View(learner);
        }

        // GET: /Learner/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Learner learner = db.Learners.Find(id);
            if (learner == null)
            {
                return HttpNotFound();
            }
            return View(learner);
        }

        // POST: /Learner/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Learner learner = db.Learners.Find(id);
            db.Learners.Remove(learner);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        // POST: /Learner/DeletePhone/5/12
        //[HttpPost]
        public ActionResult DeletePhone(int id, int index)
        {
            Learner learner = db.Learners.Find(id);
            learner.Person.Phones.RemoveAt(index);
            db.SaveChanges();
            if (Request.IsAjaxRequest())
            {
                return PartialView("EditorTemplates/Person/Phones/_Grid", learner.Person);
            }
            return View("Edit", learner);
        }

        // POST: /Learner/AddPhone/5/12
        //[HttpPost]
        public ActionResult AddPhone(int id)
        {
            Learner learner = db.Learners.Find(id);
            learner.Person.Phones.Add("");
            db.SaveChanges();
            if (Request.IsAjaxRequest())
            {
                return PartialView("EditorTemplates/Person/Phones/_Grid", learner.Person);
            }
            return View("Edit", learner);
        }

        [ChildActionOnly]
        public ActionResult TableHeaders()
        {
            return PartialView("Index/TableHeadersPartial");
        }

        [ChildActionOnly]
        public ActionResult TableValues()
        {
            Learner model = ((Person)RouteData.Values["model"]).Learner;
            return PartialView("Index/TableValuesPartial", model);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
