using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using emilberbakovdotnetitsdotcom.Data;
using emilberbakovdotnetitsdotcom.Models;
using Microsoft.AspNetCore.Builder;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
/* 
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
options.UseSqlite(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter(); 
*/
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
var myAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddDbContext<LibraryDBContext>(options =>
options.UseSqlServer(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter(); 
builder.Services.AddCors(
    options=>options.AddPolicy(
        name: myAllowSpecificOrigins, policy=>{
            policy.WithOrigins("http://localhost:4200","http://100.34.89.96:4200","http://192.168.1.14:4200","http://localhost:4200/")
            .AllowAnyHeader();
        }
    )
);


builder.Services.AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddIdentityServer()
    .AddApiAuthorization<ApplicationUser, ApplicationDbContext>();

builder.Services.AddAuthentication()
    .AddIdentityServerJwt();

builder.Services.AddControllersWithViews();
builder.Services.AddControllers();
builder.Services.AddRazorPages();

var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
    app.MapGet("/debug/routes", (IEnumerable<EndpointDataSource> endpointSources) =>
        string.Join("\n", endpointSources.SelectMany(source => source.Endpoints)));
}
else
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseIdentityServer();
app.UseAuthorization();
/*
app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");
    */
app.MapRazorPages();
app.MapControllers();
//app.MapFallbackToFile("index.html");;
/*
var host = new WebHostBuilder()
.UseKestrel()
.UseContentRoot(Directory.GetCurrentDirectory())
.UseUrls("http://localhost:5000","47.41.132.53:5000")
.UseStartup<StartupBase>().
Build();
*/
app.UseCors(myAllowSpecificOrigins); 
app.Run();
