import React from 'react';

import {render} from '@testing-library/react'
import ContentHeader from './index';

describe("ContentHeader", () => {
    const props = {
        username: 'test',
        timeStamp: new Date().toString(),
    };

    it('should render post ContentHeader correctly', () => {
        const { container } = render(<ContentHeader {...props} type="post"/>);

        expect(container.querySelector('.post-profile-pic')).toBeTruthy();
        expect(container.querySelector('.post-username')?.innerHTML).toEqual('test');
    });

    it('should render comment ContentHeader correctly', () => {
        const { container } = render(<ContentHeader {...props} type="comment"/>);

        expect(container.querySelector('.comment-profile-pic')).toBeTruthy();
        expect(container.querySelector('.post-username')?.innerHTML).toEqual('test');
    })
});