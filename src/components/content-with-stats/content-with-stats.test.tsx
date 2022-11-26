import {render, fireEvent} from '@testing-library/react'
import ContentWithStats from './index';

describe("Post", () => {
    const props = {
        content: {
            username: "test",
            body: "hello",
            hypes: [{userId: "test"}],
            views: 2,
            shares: 3,
            comments: [],
        },
        addHype: jest.fn()
    };

    it("should render ContentWithStats correctly", () => {
        const {container} = render(<ContentWithStats {...props}/>);

        expect((container.querySelector('.post-text') as HTMLElement)?.innerHTML).toBe('hello');
    });

    it ('should render stats correctly', () => {
        const {container} = render(<ContentWithStats {...props}/>);

        expect((container.querySelectorAll('.stat-number')[0] as HTMLElement)?.innerHTML).toBe('1');
        expect((container.querySelectorAll('.stat-number')[1] as HTMLElement)?.innerHTML).toBe('0');
        expect((container.querySelectorAll('.stat-number')[2] as HTMLElement)?.innerHTML).toBe('3');
        expect((container.querySelectorAll('.stat-number')[3] as HTMLElement)?.innerHTML).toBe('2');
    });

    it ("should add hype", () => {
        const {container} = render(<ContentWithStats {...props}/>);

        const hypeIcon = container.querySelector('svg') as Element;
        fireEvent.click(hypeIcon);

        expect(props.addHype).toHaveBeenCalled(); 
    });
});