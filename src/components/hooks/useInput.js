import React, { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

const useInput = () => {
    const [inputValue, setInputValue] = useState('');

    const showInput = () => (
        <InputGroup className="mb-1">
            <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
                aria-label="Search"
                aria-describedby="basic-addon1"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
        </InputGroup>
    );

    return { inputValue, setInputValue, showInput };
};

export default useInput;
