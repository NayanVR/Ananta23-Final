import React from 'react'
import { useState } from 'react';
import CreatableSelect from 'react-select/creatable';


function DropDown({ list, setList, parentValue, setParentValue }) {

    const createOption = (name) => ({
        label: name,
        value: name
    });

    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState(createOption(parentValue));

    const serverURL = import.meta.env.VITE_SERVER_URL;

    const handleCreate = (inputValue) => {
        setIsLoading(true);

        fetch(serverURL + "/api/university-list", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                value: inputValue
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setIsLoading(false);
                if (data.type === "success") {
                    const newOption = createOption(inputValue);
                    setList((prev) => [...prev, newOption])
                    setParentValue(newOption.value);
                }
            })
            .catch((err) => {
                setIsLoading(false);
            });
    };
    return (
        <>
            <CreatableSelect
                isClearable
                isDisabled={isLoading}
                isLoading={isLoading}
                onChange={(newValue) => {
                    // setValue(newValue)
                    setParentValue(newValue.value)
                }}
                onCreateOption={handleCreate}
                options={list}
                value={createOption(parentValue)}
            />
        </>
    )
}

export default DropDown