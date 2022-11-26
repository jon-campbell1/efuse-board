import * as React from 'react'
import {render, fireEvent} from '@testing-library/react'
import PostCreator from './index';

describe ("PostCreator", () => {
    const props = {
        createPost: jest.fn()
    };

    it ('should render Post Creator correctly', () => {
        const { container } = render(<PostCreator {...props}/>);
        const input = container.querySelector('input[type="text"]') as HTMLElement;
        expect(input).toBeTruthy();

        fireEvent.change(input, {target: {value: 'test'}})
        const button = container.querySelector('input[type="button"]') as HTMLElement;
        fireEvent.click(button);
        expect(props.createPost).toHaveBeenCalledWith('test'); 
    });
});