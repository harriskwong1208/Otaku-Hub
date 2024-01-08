import {render,screen,cleanup} from '@testing-library/react'
import HomePage from '../components/HomePage';
import renderer from 'react-test-renderer';
afterEach(()=>{
    cleanup();
})

test('should render noncompleted homepage component',()=>{
    const item = {id: 1, title:"One Piece", completed: false}
    render(<HomePage item={item}/>);
    const homepageElement = screen.getByTestId(`homepage-1`);
    expect(homepageElement).toBeInTheDocument();
    expect(homepageElement).toHaveTextContent('One Piece')
    expect(homepageElement).not.toContainHTML('strike');

})

test('should render completed homepage component',()=>{
    const item = {id: 3, title:"Naruto", completed: true}
    render(<HomePage item={item}/>);
    const homepageElement = screen.getByTestId(`homepage-3`);
    expect(homepageElement).toBeInTheDocument();
    expect(homepageElement).toHaveTextContent('Naruto');
    expect(homepageElement).toContainHTML('strike');
})

//creates a snapshot of the code
//if anything changes, it will fail the check and show what
//was changed
test('matches snapshot',()=>{
    const item = {id: 3, title:"Naruto", completed: true}
    const tree = renderer.create(<HomePage item={item}/>).toJSON();
});