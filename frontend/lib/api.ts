export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const API_URL = "http://localhost:3001/todos"; // muuta jos eri portti

export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch(API_URL);
  return res.json();
}

export async function addTodo(title: string): Promise<Todo> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return res.json();
}

export async function deleteTodo(id: number): Promise<void> {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}
