using AutoShop.Models;
using AutoShop.Repositories;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

var policyName = "default";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: policyName, builder =>
    {
        builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});


// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(policyName);

app.MapGet("/cars", async () => await CarRepository.GetAll());

app.MapGet("/cars/{id}", async ([FromRoute] int id) => await CarRepository.GetCar(id));

app.MapPost("/cars", async([FromBody]Car car) => await CarRepository.AddCar(car));

app.MapPut("/cars/{id}", async ([FromRoute] int id,[FromBody]Car car) => await CarRepository.UpdateCar(id,car));

app.MapDelete("/cars/{id}", async ([FromRoute] int id) => await CarRepository.DeleteCar(id));


app.MapGet("/components", async () => await ComponentRepository.GetAll());

app.MapGet("/components/{id}", async ([FromRoute] int id) => await ComponentRepository.GetComponent(id));

app.MapPost("/components", async ([FromBody] Component component) => await ComponentRepository.AddComponent(component));

app.MapPut("/components/{id}", async ([FromRoute] int id,[FromBody]Component updatedComponent) => await ComponentRepository.UpdateComponent(id, updatedComponent));

app.MapDelete("/components/{id}", async ([FromRoute] int id) => await ComponentRepository.DeleteComponent(id));

app.Run();
