using Microsoft.EntityFrameworkCore;
using emilberbakovdotnetitsdotcom.Models;

namespace emilberbakovdotnetitsdotcom.Data
{
    public class LibraryDBContext:DbContext
    {
        public LibraryDBContext(DbContextOptions<LibraryDBContext> options) : base(options) {}
        public DbSet<LibraryDBSearch> LibraryDBSearches{get; set;}
        
    }
}