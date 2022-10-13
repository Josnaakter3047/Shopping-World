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
    public class ShoppingSessionsController : ControllerBase
    {
        private readonly ShoppingDbContext _context;

        public ShoppingSessionsController(ShoppingDbContext context)
        {
            _context = context;
        }

        // GET: api/ShoppingSessions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ShoppingSession>>> GetShoppingSessions()
        {
            return await _context.ShoppingSessions.ToListAsync();
        }

        // GET: api/ShoppingSessions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ShoppingSession>> GetShoppingSession(int id)
        {
            var shoppingSession = await _context.ShoppingSessions.FindAsync(id);

            if (shoppingSession == null)
            {
                return NotFound();
            }

            return shoppingSession;
        }

        // PUT: api/ShoppingSessions/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutShoppingSession(int id, ShoppingSession shoppingSession)
        {
            if (id != shoppingSession.Id)
            {
                return BadRequest();
            }

            _context.Entry(shoppingSession).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShoppingSessionExists(id))
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

        // POST: api/ShoppingSessions
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ShoppingSession>> PostShoppingSession(ShoppingSession shoppingSession)
        {
            _context.ShoppingSessions.Add(shoppingSession);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetShoppingSession", new { id = shoppingSession.Id }, shoppingSession);
        }

        // DELETE: api/ShoppingSessions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ShoppingSession>> DeleteShoppingSession(int id)
        {
            var shoppingSession = await _context.ShoppingSessions.FindAsync(id);
            if (shoppingSession == null)
            {
                return NotFound();
            }

            _context.ShoppingSessions.Remove(shoppingSession);
            await _context.SaveChangesAsync();

            return shoppingSession;
        }

        private bool ShoppingSessionExists(int id)
        {
            return _context.ShoppingSessions.Any(e => e.Id == id);
        }
    }
}
