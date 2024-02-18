import { pgTable, text, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";

export const todos = pgTable('todos', {
  id: uuid('id').primaryKey(),
  name: text('name'),
  email: varchar('email', { length: 256 })
},
  (todos) => {
    return {
      uniqueIdx: uniqueIndex('unique_idx').on(todos.email)
    }
  }
)