using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoAppForAngular.API.Models;

namespace TodoAppForAngular.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TodosController : ControllerBase
{
    private readonly AppDbContext _context;

    public TodosController(AppDbContext context)
    {
        _context = context;
    }

   
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Todo>>> GetTodos()
    {
        if (_context.Todos == null) return NotFound();
        return await _context.Todos.ToListAsync();
    }

   
    [HttpGet("{id}")]
    public async Task<ActionResult<Todo>> GetTodo(int id)
    {
        if (_context.Todos == null) return NotFound();
        var todo = await _context.Todos.FindAsync(id);

        if (todo == null) return NotFound();

        return todo;
    }

   
    [HttpPut("{id}")]
    public async Task<IActionResult> PutTodo(int id, Todo todo)
    {
        if (id != todo.Id) return BadRequest();

        _context.Entry(todo).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!TodoExists(id))
                return NotFound();
            throw;
        }

        return NoContent();
    }

    [HttpPut("IsCompleted/{id}")]
    public async Task<IActionResult> IsCompleted(int id)
    {
        var todo =await _context.Todos!.FindAsync(id);

        todo.IsCompleted = !todo.IsCompleted;
      await  _context.SaveChangesAsync();
      return NoContent();

    }
    
    
    

    [HttpPost]
    public async Task<ActionResult<Todo>> PostTodo(Todo todo)
    {
        if (_context.Todos == null) return Problem("Entity set 'AppDbContext.Todos'  is null.");
        
        todo.Created=DateTime.Now;
        _context.Todos.Add(todo);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetTodo", new { id = todo.Id }, todo);
    }
    
    
    
    
    
    

   
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTodo(int id)
    {
        if (_context.Todos == null) return NotFound();
        var todo = await _context.Todos.FindAsync(id);
        if (todo == null) return NotFound();

        _context.Todos.Remove(todo);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool TodoExists(int id)
    {
        return (_context.Todos?.Any(e => e.Id == id)).GetValueOrDefault();
    }
}