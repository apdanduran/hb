import React from 'react'
import { render, screen } from '@testing-library/react'
import Links from './Links';

const mockedSetTodo = jest.fn();

test("is the link added test", () => {

     render(
          < Links
               setVotedSort={mockedSetTodo}
               setTempDeletedName={mockedSetTodo}
               sortsFunc={mockedSetTodo}
               setAddLinkControl={mockedSetTodo}
               setLink={mockedSetTodo}
               links={[
                    { linkName: "google", linkUrl: "www.google.com", date: "2022-02-15T13:35:14.322Z", vote: 3 },
                    { linkName: "mynet", linkUrl: "www.mynet.com", date: "2022-02-15T13:35:14.322Z", vote: 3 }
               ]}
          />

     );
     const divElement = screen.getAllByTestId(/linkElement/i)
     expect(divElement.length).toBe(2)

})


