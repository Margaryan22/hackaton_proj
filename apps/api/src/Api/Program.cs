using Api.Data;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("Default")));
builder.Services.AddHealthChecks()
    .AddDbContextCheck<AppDbContext>("db", tags: ["ready"]);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
  app.MapOpenApi(); // схема API: /openapi/v1.json
}

var api = app.MapGroup("/api/v1");

// Жив ли процесс — без внешних зависимостей
api.MapHealthChecks("/health", new HealthCheckOptions { Predicate = _ => false });
// Готов ли обслуживать запросы — в том числе доступна ли база
api.MapHealthChecks("/health/ready", new HealthCheckOptions { Predicate = c => c.Tags.Contains("ready") });

app.Run();

// Нужен тестам (WebApplicationFactory<Program>)
public partial class Program;
