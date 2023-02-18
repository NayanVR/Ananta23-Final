import React from 'react'
import { useState } from 'react';
import CreatableSelect from 'react-select/creatable';


function DropDown() {
    const createOption = (label) => ({
        label,
        value: label.toLowerCase().replace(/\W/g, ''),
    });
    const defaultOptions = [
        createOption('One'),
        createOption('Two'),
        createOption('Three'),
    ];

    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState(defaultOptions);
    const [value, setValue] = useState(null);


    const handleCreate = (inputValue) => {
        setIsLoading(true);
        setTimeout(() => {
            const newOption = createOption(inputValue);
            setIsLoading(false);
            setOptions((prev) => [...prev, newOption]);
            setValue(newOption);
        }, 1000);
    };
    return (
        <>
            <CreatableSelect
                isClearable
                isDisabled={isLoading}
                isLoading={isLoading}
                onChange={(newValue) => setValue(newValue)}
                onCreateOption={handleCreate}
                options={options}
                value={value}
            />

        </>
    )
}

export default DropDown