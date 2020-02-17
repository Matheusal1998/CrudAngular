using Mvc5_Angular7Crud.Models;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;

namespace Mvc5_Angular7Crud.Controllers
{
    [RoutePrefix("api/clientes")]
    public class UsuariosController : ApiController
    {
        private AppDbContext db = new AppDbContext();

        // GET: api/clientes    
        [HttpGet]
        [Route("todos")]
        public IQueryable<Usuario> GetUsuario()
        {
            return db.Usuario;
        }

        // GET: api/Clientes/5
        [ResponseType(typeof(Usuario))]
        [HttpGet]
        [Route("{id}")]
        public IHttpActionResult GetCliente(int id)
        {
            Usuario usuario = db.Usuario.Find(id);
            if (usuario == null)
            {
                return NotFound();
            }

            return Ok(usuario);
        }
        // POST: api/Clientes
        [ResponseType(typeof(Usuario))]
        [HttpPost]
        [Route("incluir")]
        public IHttpActionResult PostCliente(Usuario usuario)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Usuario.Add(usuario);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = usuario.Id }, usuario);
        }

        // PUT: api/Clientes/5
        [ResponseType(typeof(void))]
        [HttpPut]
        [Route("alterar")]
        public IHttpActionResult PutCliente(int id, Usuario cliente)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != cliente.Id)
            {
                return BadRequest();
            }

            db.Entry(cliente).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClienteExists(id))
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
        private bool ClienteExists(int id)
        {
            return db.Usuario.Count(e => e.Id == id) > 0;
        }

        // DELETE: api/Clientes/5
        [ResponseType(typeof(Usuario))]
        [HttpDelete]
        [Route("excluir")]
        public IHttpActionResult DeleteCliente(int id)
        {
            Usuario usuario = db.Usuario.Find(id);
            if (usuario == null)
            {
                return NotFound();
            }

            db.Usuario.Remove(usuario);
            db.SaveChanges();

            return Ok(usuario);
        }
    }
}