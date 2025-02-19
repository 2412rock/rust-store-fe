using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Rust_store_backend.Models.DB
{
    public class OrderDB
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string OrderId { get; set; }
        public int Amount { get; set; }
        public string SteamId { get; set; }
    }
}
