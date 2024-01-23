import React, { createRef } from 'react'
import { useRecoilState } from 'recoil'

import type { AppState, Todo } from '../../dataStructure'
import { recoilState } from '../../dataStructure'
import { UUID } from '../../functions'

import { Layout } from './style'

const NewTodoTextInput: React.FC = () => {
  const [appState, setAppState] = useRecoilState<AppState>(recoilState)
  const textInput: React.RefObject<HTMLInputElement> =
    createRef<HTMLInputElement>()

  function addTodo(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (textInput.current === null) return
    if (e.key === 'Enter' && textInput.current.value.trim().length > 0) {
      // make new TODO object
      const todo: Todo = {
        id: UUID(),
        bodyText: textInput.current.value,
        completed: false,
      }

      // add new TODO to entire TodoList
      setAppState({ todoList: [todo, ...appState.todoList] })

      // reset text input UI value
      textInput.current.value = ''
    }
  }

  return (
    <Layout>
      <header className="header">
        <h1>todos</h1>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          ref={textInput}
          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => addTodo(e)}
          data-testid="new-todo-input-text"
          data-cy="new-todo-input-text"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
        />
        <div className="cf-turnstile" data-sitekey="0x4AAAAAAAQbM5P475JDQh1u"></div>
        <form action="server-validation.php" method="post" target="_blank" className="g-recaptcha" data-sitekey="0x4AAAAAAAQbM5P475JDQh1u" data-callback="onSubmit" data-size="invisible" data-tabindex="0">
          <button data-sitekey="0x4AAAAAAAQbM5P475JDQh1u" data-callback="onSubmit" data-size="invisible" data-tabindex="0">Submit</button>
        </form>
      </header>
    </Layout>
  )
}

export default NewTodoTextInput
