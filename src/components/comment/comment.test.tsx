import {render, fireEvent} from '@testing-library/react'
import Comment from './index';

describe("Comment", () => {
    const props = {
        commentIndex: 0,
        comment: {
            username: "test",
            body: "hello",
            timeStamp: new Date(),
            hypes: [{userId: "test"}, {userId: "test123"}],
            shares: 3,
            replies: [],
        },
        updateComment: jest.fn()
    };

    it("should render Post correctly", () => {
        const {container} = render(<Comment {...props}/>);

        expect((container.querySelector('.post-text') as HTMLElement)?.innerHTML).toBe('hello');
    });

    it ('should render stats correctly', () => {
        const {container} = render(<Comment {...props}/>);

        expect((container.querySelectorAll('.stat-number')[0] as HTMLElement)?.innerHTML).toBe('2');
        expect((container.querySelectorAll('.stat-number')[1] as HTMLElement)?.innerHTML).toBe('0');
        expect((container.querySelectorAll('.stat-number')[2] as HTMLElement)?.innerHTML).toBe('3');
    });

    it ("should add hype", () => {
        const {container} = render(<Comment {...props}/>);

        fireEvent.click(container.querySelector('svg') as Element);

        expect(props.updateComment).toHaveBeenCalled(); 
    });
});