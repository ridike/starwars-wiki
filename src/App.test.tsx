import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Button from 'react-bootstrap/Button'
import App, { WelcomePage } from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Main app page test', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it("renders the heading", () => {
    const result = shallow(<WelcomePage/>)
      .contains(<h1>Welcome to the Star Wars People's wiki</h1>);
    expect(result).toBeTruthy();
  });
  it("renders the cta button", () => {
    const component = shallow(<WelcomePage/>)
    const button = component.find(Button)
    expect(button).toHaveLength(1);
    expect(button.text()).toContain('Go to the characters\' list');
    expect(button.find('[href="/characters/list"]').length).toBe(1);
  });
});
