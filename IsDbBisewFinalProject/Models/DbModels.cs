using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IsDbBisewFinalProject.Models;


namespace IsDbBisewFinalProject.Models
{
    public class ShoppingDbContext :DbContext
    {
            public ShoppingDbContext(DbContextOptions<ShoppingDbContext> options) : base(options) 
            { 
        
            }
            public DbSet<Brand> Brands { get; set; }
            public DbSet<Cart> Carts { get; set; }
            public DbSet<CartDetail> CartDetails { get; set; }
            public DbSet<Category> Categories { get; set; }
            public DbSet<Confirmation> Confirmations { get; set; }
            public DbSet<Customer> Customers { get; set; }
            public DbSet<Payment> Payments { get; set; }
            public DbSet<PaymentMethod> PaymentMethods { get; set; }
            public DbSet<Product> Products { get; set; }
            public DbSet<ProductImage> ProductImages { get; set; }
            public DbSet<Purchase> Purchases { get; set; }
            public DbSet<PurchaseDetail> PurchaseDetails { get; set; }
            public DbSet<Role> Roles { get; set; }
            public DbSet<Sales> Sales { get; set; }
            public DbSet<SalesDetails> SalesDetails { get; set; }
            public DbSet<Shipment> Shipments { get; set; }
            public DbSet<ShoppingSession> ShoppingSessions { get; set; }
            public DbSet<Stock> Stocks { get; set; }
            public DbSet<Supplier> Suppliers { get; set; }
            public DbSet<User> Users { get; set; }
            public DbSet<IsDbBisewFinalProject.Models.SubCategory> SubCategory { get; set; }
            

    }
}
