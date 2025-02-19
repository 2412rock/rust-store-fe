using Microsoft.EntityFrameworkCore;

namespace Rust_store_backend.Models.DB
{
    public class RustDBContext: DbContext
    {
        public DbSet<OrderDB> Orders { get; set; }

        public RustDBContext(DbContextOptions<RustDBContext> options) : base(options)
        { }
    }
}
