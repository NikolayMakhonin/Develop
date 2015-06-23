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
    public class PersonController : Controller
    {
        private SchoolEntities db = new SchoolEntities();

        // GET: /Person/
        public ActionResult Index()
        {
            var persons = db.Persons.Include(p => p.Learner).Include(p => p.Parent).Include(p => p.Teacher);
            return View(persons.ToList());
        }

        // GET: /Person/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Person person = db.Persons.Find(id);
            if (person == null)
            {
                return HttpNotFound();
            }
            return View(person);
        }

        // GET: /Person/Create
        public ActionResult Create()
        {
            ViewBag.Id = new SelectList(db.Learners, "IdPerson", "School");
            ViewBag.Id = new SelectList(db.Parents, "IdPerson", "JobPlace");
            ViewBag.Id = new SelectList(db.Teachers, "IdPerson", "ScholasticDegree");
            return View();
        }

        // POST: /Person/Create
        // Чтобы защититься от атак чрезмерной передачи данных, включите определенные свойства, для которых следует установить привязку. Дополнительные 
        // сведения см. в статье http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include="Id,FirstName,LastName,MiddleName,Gender,Address,Email")] Person person)
        {
            if (ModelState.IsValid)
            {
                db.Persons.Add(person);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.Id = new SelectList(db.Learners, "IdPerson", "School", person.Id);
            ViewBag.Id = new SelectList(db.Parents, "IdPerson", "JobPlace", person.Id);
            ViewBag.Id = new SelectList(db.Teachers, "IdPerson", "ScholasticDegree", person.Id);
            return View(person);
        }

        // GET: /Person/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Person person = db.Persons.Find(id);
            if (person == null)
            {
                return HttpNotFound();
            }
            ViewBag.Id = new SelectList(db.Learners, "IdPerson", "School", person.Id);
            ViewBag.Id = new SelectList(db.Parents, "IdPerson", "JobPlace", person.Id);
            ViewBag.Id = new SelectList(db.Teachers, "IdPerson", "ScholasticDegree", person.Id);
            return View(person);
        }

        // POST: /Person/Edit/5
        // Чтобы защититься от атак чрезмерной передачи данных, включите определенные свойства, для которых следует установить привязку. Дополнительные 
        // сведения см. в статье http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include="Id,FirstName,LastName,MiddleName,Gender,Address,Email")] Person person)
        {
            if (ModelState.IsValid)
            {
                db.Entry(person).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.Id = new SelectList(db.Learners, "IdPerson", "School", person.Id);
            ViewBag.Id = new SelectList(db.Parents, "IdPerson", "JobPlace", person.Id);
            ViewBag.Id = new SelectList(db.Teachers, "IdPerson", "ScholasticDegree", person.Id);
            return View(person);
        }

        // GET: /Person/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Person person = db.Persons.Find(id);
            if (person == null)
            {
                return HttpNotFound();
            }
            return View(person);
        }

        // POST: /Person/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Person person = db.Persons.Find(id);
            db.Persons.Remove(person);
            db.SaveChanges();
            return RedirectToAction("Index");
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
