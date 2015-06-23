using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Spatial;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using DataLayer.Model;
using GeoBase.Models.Geo;

namespace GeoBase.Controllers
{
    public class GeoController : ApiController
    {
        private readonly GeoModel db = new GeoModel();

        // GET api/Geo
        [GeographyCountValidationAttribute(ElementCount = 1, PointMinCount = 1, PointMaxCount = 4)]
        public IQueryable<Geo> GetGeos(DbGeography area)
        {
            return from g in db.Geos 
                   where g.GeoData.Intersects(area) 
                   select g;
        }

        // GET api/Geo/5
        [ResponseType(typeof(Geo))]
        public async Task<IHttpActionResult> GetGeo(int id)
        {
            Geo geo = await db.Geos.FindAsync(id);
            if (geo == null)
            {
                return NotFound();
            }

            return Ok(geo);
        }

        // PUT api/Geo/5
        public async Task<IHttpActionResult> PutGeo(int id, Geo geo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != geo.Id)
            {
                return BadRequest();
            }

            db.Entry(geo).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GeoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST api/Geo
        [ResponseType(typeof(Geo))]
        public async Task<IHttpActionResult> PostGeo(Geo geo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Geos.Add(geo);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = geo.Id }, geo);
        }

        // DELETE api/Geo/5
        [ResponseType(typeof(Geo))]
        public async Task<IHttpActionResult> DeleteGeo(int id)
        {
            Geo geo = await db.Geos.FindAsync(id);
            if (geo == null)
            {
                return NotFound();
            }

            db.Geos.Remove(geo);
            await db.SaveChangesAsync();

            return Ok(geo);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool GeoExists(int id)
        {
            return db.Geos.Count(e => e.Id == id) > 0;
        }
    }
}