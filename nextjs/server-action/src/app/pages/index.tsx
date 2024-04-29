import { useState} from 'react';



export default function Home() {
  const [todoItem, setTodoItem] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todoItem }),
      });
      if (response.ok) {
        console.log('Success');
      } else {
        console.error('Failed');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
    <h2>Todo Application</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="todo">Todo Item:
          <input id="todo" name="todoItem" type="text" value={todoItem} onChange={(event) => setTodoItem(event.target.value)} required/>
        </label>
        <button type="submit">Add Todo</button>
      </form>
    </>
  )
}