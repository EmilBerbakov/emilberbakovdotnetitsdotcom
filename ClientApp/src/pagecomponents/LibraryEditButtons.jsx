import React from "react";
import { Dropdown,DropdownButton } from "react-bootstrap";


function OwnershipDropDown(BookID){
    return(
        <td>
    <DropdownButton id={`${BookID}-OwnershipDropDown`} variant='dark' menuVariant="dark" title='Ownership Status' size='sm'>
        <Dropdown.Item type='button' value='N/A'>N/A</Dropdown.Item>
        <Dropdown.Item type='button' value='WANT'>Want</Dropdown.Item>
        <Dropdown.Item type='button' value='OWN'>Own</Dropdown.Item>
    </DropdownButton>
    </td>
    )
}

function ReadDropDown(BookID){
return(
<td>
<DropdownButton id={`${BookID}-ReadDropDown`} variant='dark' menuVariant="dark" title='Read Status' size='sm'>
    <Dropdown.Item type='button' value='N/A'>N/A</Dropdown.Item>
    <Dropdown.Item type='button' value='READ'>Read</Dropdown.Item>
    <Dropdown.Item type='button' value='READING'>Reading</Dropdown.Item>
    <Dropdown.Item type='button' value='TBR'>TBR</Dropdown.Item>
</DropdownButton>
</td>
)
}

export{OwnershipDropDown,ReadDropDown}