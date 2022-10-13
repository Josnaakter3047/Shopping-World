using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IsDbBisewFinalProject.Models;

namespace IsDbBisewFinalProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchasesController : ControllerBase
    {
        private readonly ShoppingDbContext _context;

        public PurchasesController(ShoppingDbContext context)
        {
            _context = context;
        }

        // GET: api/Purchases
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Purchase>>> GetPurchases()
        {
            return await _context.Purchases.Include(p => p.Supplier).Include(p => p.PurchaseDetails).ToListAsync();
        }

        // GET: api/Purchases/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Purchase>> GetPurchase(int? id)
        {
            Purchase purchase;
            if (id is null)
            {
                purchase = await _context.Purchases.Include(p => p.Supplier).Include(p => p.PurchaseDetails).SingleOrDefaultAsync();
            }
            else
            {
                purchase = await _context.Purchases.Include(p => p.Supplier).Include(p => p.PurchaseDetails).SingleAsync(p => p.Id == id);
            }

            if (purchase == null)
            {
                return NotFound();
            }

            return purchase;
        }

        // PUT: api/Purchases/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPurchase(int id, Purchase purchase)
        {
            if (id != purchase.Id)
            {
                return BadRequest();
            }

            _context.Entry(purchase).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PurchaseExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Purchases
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Purchase>> PostPurchase(Purchase purchase)
        {
            try
            {
                _context.Database.BeginTransaction();
                _context.Purchases.Add(purchase);
                await _context.SaveChangesAsync();

                List<Stock> insertStocks = new List<Stock>();
                List<Stock> updateStocks = new List<Stock>();
                foreach (PurchaseDetail pd in purchase.PurchaseDetails)
                {
                    if(await _context.Stocks.AnyAsync(s => s.ProductId == pd.ProductId))
                    {
                        Stock stock = await _context.Stocks.SingleAsync(s => s.ProductId == pd.ProductId);
                        stock.TotalStock += pd.Quantity;
                        updateStocks.Add(stock);
                        //_context.Stocks.Update(stock);
                        //await _context.SaveChangesAsync();
                    }
                    else
                    {
                        Stock stock = new Stock();
                        stock.ProductId = pd.ProductId;
                        stock.TotalStock = pd.Quantity;
                        insertStocks.Add(stock);
                        //await _context.Stocks.AddAsync(stock);
                        //await _context.SaveChangesAsync();
                    }
                }
                await _context.Stocks.AddRangeAsync(insertStocks);
                _context.Stocks.UpdateRange(updateStocks);
                await _context.SaveChangesAsync();
                _context.Database.CommitTransaction();
                return CreatedAtAction("GetPurchase", new { id = purchase.Id }, purchase);
            }
            catch(Exception ex)
            {
                _context.Database.RollbackTransaction();
                return CreatedAtAction("GetPurchase", purchase);
            }
            
        }

        // DELETE: api/Purchases/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Purchase>> DeletePurchase(int id)
        {
            var purchase = await _context.Purchases.FindAsync(id);
            if (purchase == null)
            {
                return NotFound();
            }

            _context.Purchases.Remove(purchase);
            await _context.SaveChangesAsync();

            return purchase;
        }

        private bool PurchaseExists(int id)
        {
            return _context.Purchases.Any(e => e.Id == id);
        }
    }
}
