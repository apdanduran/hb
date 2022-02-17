import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import AddLinkPage from './AddLinkPage';

const mockedSetTodo = jest.fn();

test("add link button test", () => {
     render(
          <AddLinkPage
               setDeleteOrAdd={mockedSetTodo}
               linkName={"google"}
               linkUrl={"www.google.com"}
               setLinkName={mockedSetTodo}
               setLink={mockedSetTodo}
               showToastMessage={false}
               setShowToastMessage={mockedSetTodo}
               sortsFunc={mockedSetTodo}
               setAddLinkControl={true}
               links={[]}
          />
     )
     const addBtn = screen.getByTestId("addBtn");
     const nameInput = screen.getByTestId("nameInput");
     const linkInput = screen.getByTestId("nameInput");
     fireEvent.change(nameInput, { target: { value: "google" } })
     fireEvent.change(linkInput, { target: { value: "www.google.com" } })
     fireEvent.click(addBtn)

})
