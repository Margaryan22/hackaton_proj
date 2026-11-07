using Microsoft.EntityFrameworkCore;

namespace Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
  // Сущности добавляются сюда: public DbSet<Item> Items => Set<Item>();
}
