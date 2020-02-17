using System.ComponentModel.DataAnnotations.Schema;

namespace Mvc5_Angular7Crud.Models
{
    [Table("Usuario")]
    public class Usuario
    {
        public int Id { get; set; }
        public string NomeCompleto { get; set; }
        public string DataNascimento { get; set; }
        public string Email { get; set; }
        public string Login { get; set; }
        public string Senha { get; set; }
    }
}