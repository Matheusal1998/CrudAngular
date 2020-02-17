using System.Data.Entity;

namespace Mvc5_Angular7Crud.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext() : base("name=AppDbContext")
        { }
        public virtual DbSet<Usuario> Usuario { get; set; }
    }
}