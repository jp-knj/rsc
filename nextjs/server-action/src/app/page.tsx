import { createClient } from '@supabase/supabase-js';

export default function TodoList() {
  const addTodo = async (formData: FormData) => {
    "use server";
    const supabaseUrl = 'YOUR_SUPABASE_URL';
    const supabaseKey = process.env.SUPABASE_KEY;
    const supabase = createClient( supabaseUrl, supabaseKey);

    // Add todo item to database
    const todoItem = formData.get('todo');
    if(!todoItem){
      return;
    }

    // Save todo item to database
    const { data, error } = await supabase
      .from('todos')
      .insert([{ todo: todoItem }]);

    return (
      <>
        <h2>Todo Application</h2>
        <form action={addTodo} method="POST">
          <label htmlFor="todo">Todo Item:
            <input id="todo" name="todo" type="text"
                   placeholder="What needs to be done?"
                   required/>
          </label>
          <button type="submit">Add Todo</button>
        </form>
        <ul>
          {data && data.map((todo: any) => (
            <li key={todo.id}>{todo.todo}</li>
          ))}
        </ul>
      </>
    )
  }
}
